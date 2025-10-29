---
title: Adding Trivy & Semgrep scans to your Gitlab Pipeline
date: 2025-08-25
tags: ["cicd", "ci", "cd", "devops", "devsecops", "sre", "gitops", "pipeline", "gitlab", "workflow", "security", "trivy", "semgrep"]
language: "en"
---

![Adding Trivy & Semgrep scans to your Gitlab Pipeline](/img/gitlab_and_mascotts.png)

## Table of contents

- [Table of contents](#table-of-contents)
- [The purpose](#the-purpose)
- [The template repository](#the-template-repository)
  - [Files structure](#files-structure)
- [Writing templates](#writing-templates)
  - [Trivy](#trivy)
  - [Semgrep](#semgrep)
- [Template usage](#template-usage)
- [Finishing up](#finishing-up)

## The purpose

Securing the code is a must in any software development process. By integrating security scans into the CI/CD pipeline, we can ensure that vulnerabilities are identified and addressed early in the development lifecycle.

The best way is to create some baseline templates, that can be used across various project.

In this post, I will show you how to add Trivy and Semgrep scans to your GitLab CI/CD pipeline. Both tools are open-source and can be easily integrated into your existing pipeline.

## The template repository

First, create a new GitLab repository for your CI/CD templates.

Name it for example: `gitlab-ci-templates` and clone it to your local machine.

### Files structure

Inside the cloned repository, create the following directory structure:

```shell
gitlab-ci-templates/
├── .gitlab-ci.yml
├── templates/
│   ├── trivy.yml
│   └── semgrep.yml
```

## Writing templates

### Trivy

Trivy is a simple and comprehensive vulnerability scanner for containers and other artifacts, suitable for CI. It detects vulnerabilities of OS packages (Alpine, RHEL, CentOS, etc.) and application dependencies (Bundler, Composer, npm, yarn, etc.).

First create file:

```shell
touch templates/trivy.yml
```

Than add the following content to the file:

```yaml
---
stages:
  - test

.default_trivy_config:
  image: docker:latest
  tags:
    - YOUR_RUNNER_TAG
  variables:
    TRIVY_NO_PROGRESS: "true"
    TRIVY_CACHE_DIR: ".trivycache/"
  before_script: |
    export TRIVY_VERSION=$(wget -qO - "https://api.github.com/repos/aquasecurity/trivy/releases/latest" \
    | grep '"tag_name":' \
    | sed -E 's/.*"v([^"]+)".*/\1/') \
    echo $TRIVY_VERSION
    wget --no-verbose \
    https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}/trivy_${TRIVY_VERSION}_Linux-64bit.tar.gz \
    -O - | tar -zxvf -

container_scanning:
  extends: .default_trivy_config
  stage: test
  script:
    - touch gl-container-scanning-report.json
    - ./trivy fs --exit-code 0 --format template --template "@contrib/gitlab.tpl" -o gl-container-scanning-report.json --severity CRITICAL,HIGH /builds/$CI_PROJECT_PATH/
    - ./trivy fs --exit-code 0 --format table --severity HIGH /builds/$CI_PROJECT_PATH/
    - ./trivy fs --exit-code 1 --format table --severity CRITICAL /builds/$CI_PROJECT_PATH/
  cache:
    paths:
      - .trivycache/
  artifacts:
    paths:
      - gl-container-scanning-report.json
    reports:
      container_scanning: gl-container-scanning-report.json
  allow_failure: false
```

And save it.

### Semgrep

Next, create a file for `Semgrep`, which is a static analysis tool that finds bugs and enforces code standards at editor, commit, and CI time.

```shell
touch templates/semgrep.yml
```

And add:

```yaml
---
stages:
  - test

.default_semgrep_config:
  image:
    name: returntocorp/semgrep:latest
    entrypoint: ['']
  tags:
    - YOUR_RUNNER_TAG

sast_semgrep:
  extends: .default_semgrep_config
  stage: test
  script:
    - touch gl-sast-report.json
    - semgrep --gitlab-sast -o gl-sast-report.json /builds/$CI_PROJECT_PATH/
  artifacts:
    reports:
      sast: gl-sast-report.json
  allow_failure: false
```

## Template usage

In order to use a template in any project you just need a reference with `include` keyword.

For this purposes, we'll add it to the CI/CD of a template project:

```yaml
---
include:
  - project: "gitlab-ci-templates" # Your template repository, it can also used e.g. group like: devops/name
    ref: main # You can use tag or any other branch
    file: "/templates/trivy.yml"
  - project: "gitlab-ci-templates"
    ref: main
    file: "/templates/semgrep.yml"

stages:
  - lint
  - test

lint_templates:
  stage: lint
  image: pipelinecomponents/yamllint:latest
  tags:
    - YOUR_RUNNER_TAG
  script:
    - yamllint .
```

## Finishing up

Now, the only thing left is to commit the code and see the pipeline working.

Next step would be to add those templates to all existing repositories.

Of course, the ideal would be to block any merges without a successed pipelines and secure the main branch from direct pushes.

---
title: Integrating Sentry with Prefect for Enhanced Workflow Monitoring
date: 2025-09-13
tags: ["sentry", "prefect", "monitoring", "workflow", "error-tracking", "devops", "observability", "apm", "logging"]
language: "en"
---

![Pic](/img/sentry.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [📃 Introduction](#-introduction)
- [☢️ The core](#-the-core)
- [🧼🧼 The code](#-the-code)
  - [⛑️ The helper](#️-the-helper)
  - [🏃 The flow](#-the-flow)
- [⚠️ Note](#️-note)

## 📃 Introduction

In this article, we will explore how to integrate `Sentry`, a powerful error tracking and performance monitoring tool, with Prefect, a modern workflow orchestration tool. This integration will help you monitor your `Prefect` workflows more effectively by capturing errors straight into the `APM`.

## ☢️ The core

In order to do so, first create, add new application in your `Sentry` dashboard, and get the `DSN` key by copying it for a moment into secure place.

Then, you can use the following code snippet to set up the integration:

Please make sure to stay within the actual window inside a Sentry to make sure that the token doesn't change.

It would be good to save it inside a `Secret` block in `Prefect`, via UI or by doing it manually.

For the purpose of this short article, we'll use the name of a block as: `prefect-sentry-dsn`.

## 🧼🧼 The code

At first, we need to install the `sentry-sdk` package if you haven't done so already inside your project:

```bash
pip install sentry-sdk
```

Remember that it depends on your `Prefect` environment, so you might need to adjust the installation command accordingly.

Then, you can use the following code snippet to set up the integration:

### ⛑️ The helper

Next, you'll need to create a helper function to initialize `Sentry` with `Prefect`:

```shell
touch src/helpers/sentry_helper.py
zed src/helpers/sentry_helper.py
```

After that, we need to write some code, at first, import necessary packages:

```python
import logging
import sentry_sdk
from prefect import get_run_logger
from prefect.context import get_run_context
from sentry_sdk.integrations.logging import LoggingIntegration
from prefect.blocks.system import Secret
```

Then, we can define the function to initialize `Sentry`:

```python
def init_sentry(
    traces_sample_rate: float = 0.1,
    all_logs: bool = False,
):
    """The function to initialize Sentry with Prefect.

    :params: traces_sample_rate: The sample rate for tracing, default is 0.5 (50%).
    :params: all_logs: Whether to capture all logs, default is False.
    :return: None
    """
```

Next we get the value of a `DSN` from a `Secret` block:

```python
# 1. Load Sentry DSN from Prefect Secret Block
sentry_dsn = (Secret.load("prefect-sentry-dsn")).get()
```

Then, we make sure that the Sentry is not already initialized:

```python
# 2. Check if Sentry is already initialized
logger = get_run_logger()
if sentry_sdk.Hub.current.client is not None:
    return

# 3. Load the Sentry DSN from Prefect Secret Block
if not sentry_dsn:
    logger.warning("Sentry DSN is missing. Skipping Sentry initialization.")
    return
```

After that, we set up the logging integration:

```python
match all_logs:
    case True:
        sentry_logging = LoggingIntegration(
            level=logging.INFO,  # Capture info and above as breadcrumbs
            event_level=logging.ERROR,  # Send errors as events
        )
    case False:
        sentry_logging = LoggingIntegration(
            level=logging.WARNING,  # Capture warnings and above as breadcrumbs
            event_level=logging.ERROR,  # Send errors as events
        )

        # Block Prefect logs below WARNING level to be sent to Sentry
        prefect_logger = logging.getLogger("prefect")
        prefect_logger.setLevel(logging.WARNING)
        prefect_logger.propagate = False
```

Finally, we initialize the Sentry SDK with the provided DSN and configurations:

```python
# 4. Initialize the SDK
sentry_sdk.init(
    dsn=sentry_dsn,
    send_default_pii=True,
    enable_logs=True,
    traces_sample_rate=traces_sample_rate,
    enable_tracing=True,
    integrations=[sentry_logging],
)

And set the context for better traceability:

```python
# 5. Set Context Tags (Only available inside a Prefect run context)
run_context = get_run_context()
if run_context:
    sentry_sdk.set_tag("flow_name", run_context.flow.name)
    sentry_sdk.set_tag("flow_run_name", run_context.flow_run.name)
    sentry_sdk.set_context("flow_parameters", run_context.flow_run.parameters)

# 6. Log the successful initialization
logger.info("Sentry has been initialized successfully.")
```

### 🏃 The flow

In order to use it inside your `Prefect` flow, you can do the following:

```shell
zed src/flows/my_flow.py
```

```python
from helpers.sentry_helper import init_sentry
```

```python
@task
def my_task() -> list[int] | None:
    log = get_run_logger()

    log.info("Executing my_task...")
    result = [for f in range(10) f * 2]

    log.info("my_task completed.")

    return

@task
def my_failing_task() -> None:
    log = get_run_logger()

    log.info("Executing my_failing_task...")

    raise ValueError("This is a test error for Sentry integration.")
```

Finally, we can define the flow and initialize Sentry at the start:

```python

@flow
def my_flow() -> None:
    # Initialize Sentry at the start of the flow
    init_sentry(traces_sample_rate=0.2, all_logs=True)

    result = my_task()

    log.info(f"God data from task A: {result}")

    my_failing_task()
```

Once you run the flow, any errors and logs will be captured by `Sentry`.

## ⚠️ Note

Please consider that in some cames you would have as much logs as your Prefect generates, so be careful with the `all_logs` parameter and take into consideration the storage matter.

I would opt-in for `False` as a default value.

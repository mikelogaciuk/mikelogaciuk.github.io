---
title: "Multipass: Your Local Cloud-Like Environment"
date: 2025-12-17
tags: ["devops", "virtualization", "multipass", "cloud-init", "terraform", "infrastructure", "ubuntu", "virtualbox", "development"]
language: "en"
---

![Multipass](/img/multipass-hero.png)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [🧠 Introduction](#-introduction)
- [🎯 What is Multipass?](#-what-is-multipass)
- [💾 Installation](#-installation)
  - [🪟 Windows](#-windows)
  - [🍎 macOS](#-macos)
  - [🐧 Linux](#-linux)
- [⚙️ Configuration with VirtualBox Backend](#️-configuration-with-virtualbox-backend)
- [🚀 Basic Usage](#-basic-usage)
  - [📋 Listing Available Images](#-listing-available-images)
  - [🏗️ Creating Instances](#️-creating-instances)
  - [💻 Managing Instances](#-managing-instances)
- [🌐 Cloud-Init Integration](#-cloud-init-integration)
  - [📝 Basic Cloud-Init Example](#-basic-cloud-init-example)
  - [🔐 Advanced Cloud-Init with Users and SSH Keys](#-advanced-cloud-init-with-users-and-ssh-keys)
  - [🐳 Cloud-Init with Docker Installation](#-cloud-init-with-docker-installation)
- [🏗️ Terraform Provisioning](#️-terraform-provisioning)
  - [📦 Setting Up Terraform Provider](#-setting-up-terraform-provider)
  - [🎯 Basic Terraform Configuration](#-basic-terraform-configuration)
  - [🔄 Multi-Instance Terraform Setup](#-multi-instance-terraform-setup)
- [🎪 Various Machine Types and Configurations](#-various-machine-types-and-configurations)
  - [💪 Different Resource Specifications](#-different-resource-specifications)
  - [📊 Ubuntu Version Matrix](#-ubuntu-version-matrix)
- [🛠️ Practical Use Cases](#️-practical-use-cases)
  - [🧪 Development Environment](#-development-environment)
  - [🔬 Testing CI/CD Pipelines](#-testing-cicd-pipelines)
  - [🎓 Learning and Experimentation](#-learning-and-experimentation)
- [🎭 Advanced Features](#-advanced-features)
  - [📂 File Sharing and Mounts](#-file-sharing-and-mounts)
  - [🌐 Network Configuration](#-network-configuration)
  - [📸 Snapshots](#-snapshots)
- [🔍 Troubleshooting](#-troubleshooting)
- [🎬 Conclusion](#-conclusion)
- [🔗 Resources](#-resources)

## 🧠 Introduction

In the modern DevOps landscape, having a quick, reliable way to spin up virtual machines that mimic cloud environments is invaluable. Whether you're testing infrastructure code, developing cloud-native applications, or learning about distributed systems, you need a tool that's both powerful and lightweight.

Enter **Multipass** - Canonical's solution for running Ubuntu VMs on your local machine with the simplicity of cloud instances. Think of it as your personal cloud datacenter running on your laptop.

## 🎯 What is Multipass?

**Multipass** is a lightweight VM manager designed by Canonical (the company behind Ubuntu) that allows you to launch and manage Ubuntu instances with a single command. It provides:

- **Lightning-fast VM creation** - Instances launch in seconds, not minutes
- **Cloud-like experience** - Uses cloud-init for configuration, just like AWS or Azure
- **Multiple hypervisor support** - Works with Hyper-V, VirtualBox, QEMU/KVM, and native hypervisors
- **Minimal resource footprint** - Optimized Ubuntu images that are small and efficient
- **Simple CLI** - Easy-to-use command-line interface similar to Docker
- **Cross-platform** - Available on Windows, macOS, and Linux

It's perfect for developers who want to:
- Test Kubernetes clusters locally
- Develop infrastructure-as-code (Terraform, Ansible)
- Create reproducible development environments
- Test software on different Ubuntu versions
- Learn cloud technologies without cloud costs

## 💾 Installation

### 🪟 Windows

On Windows, Multipass can use either Hyper-V or VirtualBox as its backend. For this guide, we'll focus on VirtualBox since it's more accessible.

First, install VirtualBox:

```powershell
# Using Scoop
scoop install virtualbox

# Or download from https://www.virtualbox.org/
```

Then install Multipass:

```powershell
# Using Scoop
scoop bucket add extras
scoop install multipass

# Or using Chocolatey
choco install multipass

# Or download the installer from:
# https://multipass.run/download/windows
```

### 🍎 macOS

On macOS, Multipass uses the native hypervisor framework by default:

```bash
# Using Homebrew
brew install --cask multipass

# Or download from https://multipass.run/download/macos
```

### 🐧 Linux

On Linux, you can use snap (recommended) or build from source:

```bash
# Using snap (recommended)
sudo snap install multipass

# On Ubuntu/Debian with apt
sudo apt update
sudo apt install multipass

# The snap version is typically more up-to-date
```

Verify installation:

```bash
multipass version
```

## ⚙️ Configuration with VirtualBox Backend

By default, Multipass uses the native hypervisor on each platform. To use VirtualBox as the backend (especially useful on Windows), you need to configure it:

**On Windows:**

```powershell
# Set VirtualBox as the driver
multipass set local.driver=virtualbox

# Verify the setting
multipass get local.driver
```

**On macOS/Linux:**

```bash
# Stop the Multipass daemon
sudo multipass stop --all

# Set VirtualBox as the driver
multipass set local.driver=virtualbox

# Restart multipass service (Linux with snap)
sudo snap restart multipass

# Or on macOS
sudo launchctl unload /Library/LaunchDaemons/com.canonical.multipassd.plist
sudo launchctl load /Library/LaunchDaemons/com.canonical.multipassd.plist
```

**Why use VirtualBox?**
- More control over networking
- Better compatibility with corporate environments
- Can use VirtualBox GUI for advanced debugging
- Easier to integrate with existing VirtualBox workflows

## 🚀 Basic Usage

### 📋 Listing Available Images

Multipass provides several Ubuntu images optimized for different purposes:

```bash
# List all available images
multipass find

# Output will show:
# Image                       Aliases           Version          Description
# 22.04                       jammy             20231124         Ubuntu 22.04 LTS
# 24.04                       noble,lts         20241210         Ubuntu 24.04 LTS
# 23.10                       mantic            20231026         Ubuntu 23.10
# core22                                        20231123         Ubuntu Core 22
# minikube                                      v1.32.0          Minikube is local Kubernetes
```

### 🏗️ Creating Instances

Creating a VM is as simple as:

```bash
# Launch default instance (latest LTS Ubuntu)
multipass launch --name my-vm

# Launch specific Ubuntu version
multipass launch 22.04 --name jammy-vm

# Launch with specific resources
multipass launch --name dev-vm \
  --cpus 4 \
  --memory 8G \
  --disk 50G

# Launch and execute a command
multipass launch --name test-vm \
  -- bash -c "echo 'Hello from inside the VM!'"
```

### 💻 Managing Instances

```bash
# List all instances
multipass list

# Get detailed info about an instance
multipass info my-vm

# Start/stop/restart instances
multipass start my-vm
multipass stop my-vm
multipass restart my-vm

# Delete an instance
multipass delete my-vm

# Permanently remove deleted instances
multipass purge

# Execute commands in an instance
multipass exec my-vm -- uname -a
multipass exec my-vm -- df -h

# Get a shell
multipass shell my-vm

# Transfer files
multipass transfer local-file.txt my-vm:/home/ubuntu/
multipass transfer my-vm:/var/log/syslog ./
```

## 🌐 Cloud-Init Integration

Cloud-init is the industry standard for cloud instance initialization. Multipass supports cloud-init natively, making your local VMs behave exactly like cloud instances.

### 📝 Basic Cloud-Init Example

Create a file named `cloud-init.yaml`:

```yaml
#cloud-config

# Update and upgrade packages on first boot
package_update: true
package_upgrade: true

# Install packages
packages:
  - git
  - curl
  - vim
  - htop
  - build-essential

# Run commands
runcmd:
  - echo "Instance initialized at $(date)" >> /var/log/init.log
  - git config --global user.name "Dev User"
  - git config --global user.email "dev@example.com"

# Write files
write_files:
  - path: /etc/motd
    content: |
      Welcome to your Multipass Development Environment!
      This instance was configured with cloud-init.
    permissions: '0644'
```

Launch with cloud-init:

```bash
multipass launch --name cloud-init-vm \
  --cloud-init cloud-init.yaml
```

### 🔐 Advanced Cloud-Init with Users and SSH Keys

```yaml
#cloud-config

users:
  - name: devops
    groups: sudo, docker
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    shell: /bin/bash
    ssh_authorized_keys:
      - ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAB... your-key-here

package_update: true
package_upgrade: true

packages:
  - git
  - curl
  - vim
  - htop
  - python3-pip

runcmd:
  - systemctl enable ssh
  - systemctl start ssh
  - pip3 install ansible
  
write_files:
  - path: /home/devops/.bashrc
    append: true
    content: |
      export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
      alias ll='ls -lah'
      alias k='kubectl'
    owner: devops:devops
```

Launch with advanced configuration:

```bash
multipass launch 24.04 --name devops-vm \
  --cpus 4 \
  --memory 8G \
  --disk 40G \
  --cloud-init cloud-init-advanced.yaml
```

### 🐳 Cloud-Init with Docker Installation

```yaml
#cloud-config

package_update: true
package_upgrade: true

packages:
  - apt-transport-https
  - ca-certificates
  - curl
  - gnupg
  - lsb-release

runcmd:
  # Install Docker
  - curl -fsSL https://get.docker.com -o get-docker.sh
  - sh get-docker.sh
  - usermod -aG docker ubuntu
  # Install Docker Compose
  - curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  - chmod +x /usr/local/bin/docker-compose
  # Start a test container
  - docker run -d --name nginx -p 80:80 nginx:alpine

write_files:
  - path: /home/ubuntu/docker-compose.yml
    content: |
      version: '3.8'
      services:
        web:
          image: nginx:alpine
          ports:
            - "8080:80"
          volumes:
            - ./html:/usr/share/nginx/html
    owner: ubuntu:ubuntu
    permissions: '0644'
```

## 🏗️ Terraform Provisioning

While Multipass doesn't have an official Terraform provider, we can use the `null_resource` and `local-exec` provisioner to manage Multipass instances with Terraform.

### 📦 Setting Up Terraform Provider

Create a `main.tf` file:

```hcl
terraform {
  required_version = ">= 1.0"
  required_providers {
    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }
}
```

### 🎯 Basic Terraform Configuration

```hcl
# variables.tf
variable "instance_name" {
  description = "Name of the Multipass instance"
  type        = string
  default     = "terraform-vm"
}

variable "instance_cpus" {
  description = "Number of CPUs"
  type        = number
  default     = 2
}

variable "instance_memory" {
  description = "Memory allocation"
  type        = string
  default     = "4G"
}

variable "instance_disk" {
  description = "Disk size"
  type        = string
  default     = "20G"
}

variable "ubuntu_version" {
  description = "Ubuntu version to use"
  type        = string
  default     = "24.04"
}

# main.tf
resource "null_resource" "multipass_instance" {
  triggers = {
    instance_name = var.instance_name
    instance_cpus = var.instance_cpus
    instance_memory = var.instance_memory
    instance_disk = var.instance_disk
    ubuntu_version = var.ubuntu_version
  }

  provisioner "local-exec" {
    command = <<-EOT
      multipass launch ${var.ubuntu_version} \
        --name ${var.instance_name} \
        --cpus ${var.instance_cpus} \
        --memory ${var.instance_memory} \
        --disk ${var.instance_disk}
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = "multipass delete ${self.triggers.instance_name} && multipass purge"
  }
}

# Get instance info
resource "null_resource" "instance_info" {
  depends_on = [null_resource.multipass_instance]

  provisioner "local-exec" {
    command = "multipass info ${var.instance_name}"
  }
}

# outputs.tf
output "instance_name" {
  value = var.instance_name
  description = "The name of the created instance"
}

output "connect_command" {
  value = "multipass shell ${var.instance_name}"
  description = "Command to connect to the instance"
}
```

### 🔄 Multi-Instance Terraform Setup

```hcl
# multi-instances.tf
locals {
  instances = {
    "web-server" = {
      cpus   = 2
      memory = "4G"
      disk   = "20G"
      version = "24.04"
    }
    "db-server" = {
      cpus   = 4
      memory = "8G"
      disk   = "50G"
      version = "22.04"
    }
    "cache-server" = {
      cpus   = 2
      memory = "2G"
      disk   = "10G"
      version = "24.04"
    }
  }
}

resource "null_resource" "multipass_cluster" {
  for_each = local.instances

  triggers = {
    instance_name = each.key
  }

  provisioner "local-exec" {
    command = <<-EOT
      multipass launch ${each.value.version} \
        --name ${each.key} \
        --cpus ${each.value.cpus} \
        --memory ${each.value.memory} \
        --disk ${each.value.disk}
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = "multipass delete ${self.triggers.instance_name}"
  }
}

resource "null_resource" "cleanup" {
  depends_on = [null_resource.multipass_cluster]

  provisioner "local-exec" {
    when    = destroy
    command = "multipass purge"
  }
}

output "cluster_instances" {
  value = {
    for k, v in local.instances : k => {
      cpus   = v.cpus
      memory = v.memory
      disk   = v.disk
    }
  }
}
```

Deploy your infrastructure:

```bash
# Initialize Terraform
terraform init

# Plan the deployment
terraform plan

# Apply the configuration
terraform apply -auto-approve

# Destroy when done
terraform destroy -auto-approve
```

## 🎪 Various Machine Types and Configurations

### 💪 Different Resource Specifications

Multipass is flexible with resource allocation. Here are common configurations:

```bash
# Micro instance - for lightweight services
multipass launch --name micro-vm \
  --cpus 1 \
  --memory 1G \
  --disk 10G

# Small instance - for development
multipass launch --name small-vm \
  --cpus 2 \
  --memory 4G \
  --disk 20G

# Medium instance - for testing
multipass launch --name medium-vm \
  --cpus 4 \
  --memory 8G \
  --disk 40G

# Large instance - for CI/CD or heavy workloads
multipass launch --name large-vm \
  --cpus 8 \
  --memory 16G \
  --disk 100G

# Extra large - for kubernetes or complex environments
multipass launch --name xlarge-vm \
  --cpus 16 \
  --memory 32G \
  --disk 200G
```

### 📊 Ubuntu Version Matrix

Test your code across different Ubuntu versions:

```bash
# Ubuntu 24.04 LTS (Noble Numbat) - Latest LTS
multipass launch 24.04 --name noble-vm

# Ubuntu 22.04 LTS (Jammy Jellyfish) - Previous LTS
multipass launch 22.04 --name jammy-vm

# Ubuntu 20.04 LTS (Focal Fossa) - Still widely used
multipass launch 20.04 --name focal-vm

# Latest non-LTS for bleeding edge testing
multipass launch daily:24.10 --name latest-vm
```

**Create a test matrix script:**

```bash
#!/bin/bash
# test-matrix.sh

VERSIONS=("20.04" "22.04" "24.04")
SCRIPT_TO_TEST="./my-install-script.sh"

for version in "${VERSIONS[@]}"; do
  echo "Testing on Ubuntu ${version}..."
  
  VM_NAME="test-${version}"
  
  # Launch VM
  multipass launch ${version} --name ${VM_NAME}
  
  # Transfer test script
  multipass transfer ${SCRIPT_TO_TEST} ${VM_NAME}:/home/ubuntu/
  
  # Execute test
  multipass exec ${VM_NAME} -- bash /home/ubuntu/$(basename ${SCRIPT_TO_TEST})
  
  # Check result
  if [ $? -eq 0 ]; then
    echo "✅ Test passed on Ubuntu ${version}"
  else
    echo "❌ Test failed on Ubuntu ${version}"
  fi
  
  # Cleanup
  multipass delete ${VM_NAME}
done

multipass purge
```

## 🛠️ Practical Use Cases

### 🧪 Development Environment

Create a consistent development environment that matches production:

```yaml
#cloud-config for dev environment

users:
  - name: developer
    groups: sudo, docker
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    shell: /bin/bash

package_update: true
package_upgrade: true

packages:
  - build-essential
  - git
  - curl
  - wget
  - vim
  - tmux
  - python3-pip
  - python3-venv
  - nodejs
  - npm

runcmd:
  # Install development tools
  - npm install -g yarn typescript
  - pip3 install black pylint pytest
  # Clone your project
  - su - developer -c "git clone https://github.com/yourusername/yourproject.git"
  # Setup environment
  - su - developer -c "cd yourproject && python3 -m venv venv"

write_files:
  - path: /home/developer/.vimrc
    content: |
      syntax on
      set number
      set expandtab
      set tabstop=4
      set shiftwidth=4
    owner: developer:developer
```

Launch:

```bash
multipass launch --name dev-env \
  --cpus 4 \
  --memory 8G \
  --disk 50G \
  --cloud-init dev-cloud-init.yaml

# Mount your local code directory
multipass mount ~/projects dev-env:/home/ubuntu/projects
```

### 🔬 Testing CI/CD Pipelines

Test your CI/CD pipeline locally before pushing:

```bash
# Create a VM that mimics your CI environment
multipass launch 22.04 --name ci-test \
  --cpus 2 \
  --memory 4G

# Install CI tools
multipass exec ci-test -- bash -c "
  curl -fsSL https://get.docker.com | sh
  usermod -aG docker ubuntu
  docker run -d -p 8080:8080 -p 50000:50000 jenkins/jenkins:lts
"

# Get Jenkins initial password
sleep 30
multipass exec ci-test -- docker exec \$(docker ps -q) cat /var/jenkins_home/secrets/initialAdminPassword
```

### 🎓 Learning and Experimentation

Perfect for learning new technologies without polluting your main system:

```bash
# Create a Kubernetes learning environment
multipass launch --name k8s-learn \
  --cpus 4 \
  --memory 8G \
  --disk 40G

multipass exec k8s-learn -- bash -c "
  # Install k3s (lightweight Kubernetes)
  curl -sfL https://get.k3s.io | sh -
  
  # Wait for k3s to be ready
  sleep 15
  
  # Get kubeconfig
  sudo cat /etc/rancher/k3s/k3s.yaml
"

# Test database cluster
multipass launch --name mongo-primary --cpus 2 --memory 4G
multipass launch --name mongo-secondary --cpus 2 --memory 4G
multipass launch --name mongo-arbiter --cpus 1 --memory 2G
```

## 🎭 Advanced Features

### 📂 File Sharing and Mounts

Share files between your host and VM:

```bash
# Mount a local directory to the VM
multipass mount ~/Documents my-vm:/home/ubuntu/documents

# Mount with specific uid/gid
multipass mount ~/projects my-vm:/home/ubuntu/projects \
  --uid-map 1000:1000 \
  --gid-map 1000:1000

# List all mounts
multipass info my-vm | grep Mounts

# Unmount
multipass unmount my-vm:/home/ubuntu/documents
```

**Access host files from VM:**

```bash
# From inside the VM
multipass shell my-vm
cd ~/documents
ls -la
# You'll see your host files here!
```

### 🌐 Network Configuration

Get VM IP addresses and configure networking:

```bash
# Get instance IP
multipass info my-vm | grep IPv4

# Or use a script to extract it
VM_IP=$(multipass info my-vm | grep IPv4 | awk '{print $2}')
echo "VM IP: $VM_IP"

# SSH into the instance
ssh ubuntu@$VM_IP

# Forward ports from host to VM (using VirtualBox)
# This is done through VirtualBox directly if needed
VBoxManage controlvm "my-vm" natpf1 "web,tcp,,8080,,80"
```

**Multi-VM networking:**

```bash
# Create multiple VMs
multipass launch --name vm1
multipass launch --name vm2

# Get their IPs
IP_VM1=$(multipass info vm1 | grep IPv4 | awk '{print $2}')
IP_VM2=$(multipass info vm2 | grep IPv4 | awk '{print $2}')

# Test connectivity
multipass exec vm1 -- ping -c 3 $IP_VM2
```

### 📸 Snapshots

Multipass supports snapshots (experimental feature on some platforms):

```bash
# Create a snapshot
multipass snapshot my-vm --name before-upgrade

# List snapshots
multipass snapshot list my-vm

# Restore from snapshot
multipass restore my-vm.before-upgrade

# Delete snapshot
multipass snapshot delete my-vm.before-upgrade
```

**Note:** Snapshot support depends on the hypervisor backend. VirtualBox has good snapshot support.

## 🔍 Troubleshooting

Common issues and solutions:

**Instance won't start:**

```bash
# Check daemon status
multipass version

# View logs (Linux)
sudo journalctl -u snap.multipass.multipassd

# View logs (macOS)
cat /Library/Logs/Multipass/multipassd.log

# Restart the daemon
# Linux (snap)
sudo snap restart multipass

# macOS
sudo launchctl unload /Library/LaunchDaemons/com.canonical.multipassd.plist
sudo launchctl load /Library/LaunchDaemons/com.canonical.multipassd.plist
```

**VirtualBox conflicts:**

```bash
# Check current driver
multipass get local.driver

# Switch driver if needed
multipass set local.driver=virtualbox

# Stop all instances before switching
multipass stop --all
```

**Networking issues:**

```bash
# Check if VM has network
multipass exec my-vm -- ip addr show

# Test internet connectivity
multipass exec my-vm -- ping -c 3 8.8.8.8

# DNS issues
multipass exec my-vm -- cat /etc/resolv.conf
```

**Performance issues:**

```bash
# Check resource usage
multipass info my-vm

# Increase resources
multipass set local.my-vm.cpus=4
multipass set local.my-vm.memory=8G

# Note: You may need to recreate the instance for some changes
```

**Clean slate:**

```bash
# Delete all instances
multipass delete --all

# Purge deleted instances
multipass purge

# Remove all data (nuclear option)
# Linux
sudo snap remove multipass --purge

# Reinstall
sudo snap install multipass
```

## 🎬 Conclusion

Multipass is a powerful tool that brings cloud-like VM management to your local machine. Whether you're developing cloud-native applications, testing infrastructure code, or simply need isolated environments for experimentation, Multipass provides a fast, efficient, and user-friendly solution.

**Key Takeaways:**

✅ **Fast and lightweight** - VMs launch in seconds with minimal resource overhead  
✅ **Cloud-init native** - Configure instances exactly like cloud VMs  
✅ **Multiple backends** - Use VirtualBox, Hyper-V, or native hypervisors  
✅ **Perfect for IaC** - Test Terraform, Ansible, and other tools locally  
✅ **Cross-platform** - Works seamlessly on Windows, macOS, and Linux  
✅ **Free and open-source** - No licensing costs or limitations  

**Best Practices:**

- Use cloud-init for reproducible configurations
- Leverage snapshots before major changes
- Create resource-appropriate instances (don't over-allocate)
- Use mounts for efficient file sharing
- Clean up unused instances regularly with `multipass purge`
- Test your IaC on multiple Ubuntu versions
- Use descriptive instance names for easy management

Multipass transforms your local machine into a personal cloud datacenter, enabling rapid development and testing without the cost and complexity of cloud resources. It's an essential tool in any DevOps engineer's toolkit.

Happy virtualizing! 🚀

## 🔗 Resources

- [Multipass Official Documentation](https://multipass.run/docs)
- [Multipass GitHub Repository](https://github.com/canonical/multipass)
- [Cloud-Init Documentation](https://cloudinit.readthedocs.io/)
- [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/)
- [VirtualBox Documentation](https://www.virtualbox.org/manual/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Canonical Blog](https://ubuntu.com/blog/tag/multipass)

---
title: "Setting up SRE & DevOps Environment on Windows"
date: 2025-01-01
tags: ["devops", "sre", "windows", "setup", "guide", "configuration"]
language: "en"
---

![Pic](/img/srex.jpeg)

## 📖 Table of contents

- [📖 Table of contents](#-table-of-contents)
- [🧠 Introduction](#-introduction)
- [💎 Setting Up Your Environment](#-setting-up-your-environment)
  - [📦 Missing Package Manager](#-missing-package-manager)
  - [🫀 Oh My Posh](#-oh-my-posh)
  - [🎨 Themes in Oh My Posh](#-themes-in-oh-my-posh)
  - [🔍 Autocompletion](#-autocompletion)
  - [🤖 Nerd Fonts](#-nerd-fonts)
- [🦄 WSL](#-wsl)
- [🐳 Docker](#-docker)
- [🛠️ Build Tools](#️-build-tools)
  - [🧂 Others](#-others)
- [🪢 DevOps CLI's](#-devops-clis)
- [🪬 Database drivers](#-database-drivers)
  - [👾 Oracle SQL](#-oracle-sql)
  - [🐦‍⬛ Microsoft SQL Server](#-microsoft-sql-server)
- [⚗️ Languages runtimes](#️-languages-runtimes)
- [🐖 Powershell Profile Scripts](#-powershell-profile-scripts)

## 🧠 Introduction

    In the world of Site Reliability Engineering (SRE) and DevOps,
    having a robust and efficient development environment is crucial.
    While many professionals in this field often gravitate towards Linux-based systems,
    Windows can also be a powerful platform for SRE and DevOps tasks.
    This guide will walk you through setting up a comprehensive SRE/DevOps environment on a Windows machine.

I mean obviously it is kinda joke, but there are situations when companies tend to wish you to use Windows and you have to adapt to it.

So I decided to leave here few notes, to have them always handy in case I would need to work on Windows.

## 💎 Setting Up Your Environment

First, after finally you log into the Windows machine, you need to update Powershell:

```shell
winget install --id Microsoft.PowerShell --source winget
```

### 📦 Missing Package Manager

And install the missing package manager - Scoop (the Homebrew equivalent for Windows):

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

### 🫀 Oh My Posh

`Oh My Posh` is a framework for customizing the terminal, allowing you to tailor the appearance and functionality of PowerShell.

```shell
scoop bucket add versions
scoop bucket add extras
scoop bucket add main
scoop install main/oh-my-posh
New-Item -Path $PROFILE -Type File -Force
notepad $PROFILE
```

At the beginning of the file, add:

```shell
oh-my-posh init pwsh | Invoke-Expression
```

Then restart the terminal to enjoy the new look.

### 🎨 Themes in Oh My Posh

In order to change the theme, replace the added line with:

```shell
$theme = "catppuccin"

oh-my-posh init pwsh --config "C:\Users\$env:USERNAME\scoop\apps\oh-my-posh\current\themes\$theme.omp.json" | Invoke-Expression
```

### 🔍 Autocompletion

`Autocompletion` in PowerShell can be configured by adding the appropriate modules. To do this, we can use Scoop to install the `PSReadLine` module, which provides autocompletion and syntax highlighting:

```shell
if (Get-Module -ListAvailable -Name PSReadLine) {
    Import-Module PSReadLine
    Set-PSReadLineOption -PredictionSource History
    Set-PSReadLineOption -PredictionViewStyle ListView
    Set-PSReadLineOption -EditMode Emacs
}
```

### 🤖 Nerd Fonts

For `Nerd Fonts`, those that are use by Oh My Posh, you can download and install them from the official Nerd Fonts website: [here](https://www.nerdfonts.com/) or directly via Scoop:

```shell
scoop install nerd-fonts
```

## 🦄 WSL

To install `WSL` (Windows Subsystem for Linux), run the following command in PowerShell as Administrator:

```shell
wsl --install
```

This command will install WSL along with the default Linux distribution (usually Ubuntu). After installation, you can launch your Linux environment from the Start menu.

Or do not install any distribution, because once you install `Docker` via `Rancher Desktop`, it will install its own WSL distribution called `rancher-desktop` and better would be to use e.g. Alpine or Debian inside container instead of raw Ubuntu.

## 🐳 Docker

To install `Docker` on Windows, you can use `Rancher Desktop`, which provides a simple way to run Docker containers on Windows using WSL 2, where you can set to use `containerd` or `moby`.

The typical `Docker Desktop` is **not free anymore for business use**, but maybe your company has a license for it.

You can download `Rancher Desktop` from its official website: [here](https://rancherdesktop.io/).

## 🛠️ Build Tools

The core Windows packages that should be installed, are:

- Visual Studio (Community is free)
- Visual Studio Code
- MSVC VS C++ x64/x86 Build Tools
- Windows SDK
- Net 9.0 SDK

Those, while installed, will provide you with the necessary build tools like `cl`, `nmake`, `msbuild`, etc.

### 🧂 Others

Few other dependencies that are useful to have installed:

```shell
scoop install git gpg gopass lazygit curl ripgrep fzf winfetch btop w64devkit gcc openjdk nano msys2
```

## 🪢 DevOps CLI's

```shell
scoop install azure-cli kubectl kubectx k9s helm helmfile terraform opentofu \
terragrunt tenv git gh glab pulumi jq yq vault packer nerdctl stern
```

## 🪬 Database drivers

### 👾 Oracle SQL

From Oracle [website](https://www.oracle.com/pl/database/technologies/instant-client/winx64-64-downloads.html), download the `Instant Client Package - Basic` and `Instant Client Package - ODBC` for Windows x64.

And unzip them somewhere, e.g. `C:\oracle\instantclient_19_14`.

Then add this path to the `PATH` environment variable.

### 🐦‍⬛ Microsoft SQL Server

For MSSQL and its `ODBC`, download and install the `Microsoft ODBC Driver for SQL Server` from the official Microsoft [website](https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server).

## ⚗️ Languages runtimes

Core languages used by SRE/DevOps engineers, are mainly `Bash` or `Powershell`, `Python`, `Ruby` or `Go` and `Typescript` (Pulumi IaC).

So to install them, use:

```shell
scoop install python ruby go nvm bun
```

While for Python and Ruby, you should install additional packages, like:

```shell
pip install -U pip setuptools wheel uv
```

In order to set-up `Node` environment, use `nvm`:

```shell
nvm install 22
nvm use 22
npm install -g typescript yarn @github/copilot @pulumi/pulumi
```

For `bun`, just install it via scoop as above and then use it to install packages per project basis.

The only thing is that you should add `@types` packages manually when needed, as `bun` does not install them automatically yet:

```shell
bun add -d @types/bun
```

Sometimes, you may need also `Rust` 🦀 for some CLIs or build tools:

```shell
scoop install rustup
rustup install stable
```

## 🐖 Powershell Profile Scripts

You can also add few core functions to your Powershell profile script, to make your life easier, like:

```powershell
function tokenGenerateNew {
    param(
        [int]$Length = 32
    )
    $Bytes = New-Object 'Byte[]' ($Length)
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($Bytes)
    $Token = [Convert]::ToBase64String($Bytes)
    $Token = $Token -replace '[^a-zA-Z0-9]', ''
    return $Token.Substring(0, $Length)
}

function tokenEncode {
    param(
        [string]$InputString
    )
    $Bytes = [System.Text.Encoding]::UTF8.GetBytes($InputString)
    $Base64String = [Convert]::ToBase64String($Bytes)
    return $Base64String
}

function tokenDecode {
    param(
        [string]$Base64String
    )
    $Bytes = [Convert]::FromBase64String($Base64String)
    $DecodedString = [System.Text.Encoding]::UTF8.GetString($Bytes)
    return $DecodedString
}
```

Remember to keep it simple and avoid overloading it with too many functions, as it may slow down the terminal startup time.

So better would be to place more complex functions in modules and import them when needed.

Happy SRE/DevOpsing on Windows! 🚀

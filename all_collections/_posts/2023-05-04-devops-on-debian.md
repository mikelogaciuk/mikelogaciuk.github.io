---
layout: post
title: DevOps on Debian
date: 2023-05-04
category: ["devops", "debian", "handbook", "notes"]
---

![Devops](/img/devops.svg)

<!-- TOC -->

- [Git](#git)
- [Zsh](#zsh)
- [Oh My Zsh](#oh-my-zsh)
  - [Plugins](#plugins)
- [Fonts](#fonts)
- [Powerlevel10k](#powerlevel10k)
- [Build essentials](#build-essentials)
- [Snap](#snap)
- [Flatpak](#flatpak)
- [GlobalProtect OpenConnect](#globalprotect-openconnect)
  - [Debian 12+](#debian-12)
- [Homebrew](#homebrew)
- [Docker](#docker)
- [Setup](#setup)
  - [Add Docker to sudoers](#add-docker-to-sudoers)
  - [IP Range](#ip-range)
  - [Nerdctl](#nerdctl)
  - [Portainer](#portainer)
- [QEMU/KVM](#qemukvm)
  - [Install QEMU/KVM](#install-qemukvm)
  - [Test QEMU/KVM](#test-qemukvm)
  - [Bridge network for VMs](#bridge-network-for-vms)
- [Kubernetes](#kubernetes)
  - [Kubectl](#kubectl)
  - [VMware Tanzu](#vmware-tanzu)
  - [Helm](#helm)
  - [Argo](#argo)
- [CLI's](#clis)
  - [TERRAFORM](#terraform)
  - [VAGRANT](#vagrant)
  - [AWS CLI](#aws-cli)
  - [EKSCTL](#eksctl)
  - [Azure CLI](#azure-cli)
- [Apps](#apps)
  - [VSCode](#vscode)
  - [JetBrains](#jetbrains)
  - [Flameshot](#flameshot)
  - [Github Desktop](#github-desktop)
- [Packages](#packages)
  - [Kerberos](#kerberos)
  - [Oracle Client](#oracle-client)
  - [Microsoft SQL Server ODBC](#microsoft-sql-server-odbc)
- [Languages](#languages)
  - [Python](#python)
  - [Ruby](#ruby)
  - [Crystal](#crystal)
  - [Go](#go)
  - [Rust](#rust)
  - [Nim](#nim)
  - [Scala](#scala)
  - [Elixir](#elixir)
  - [Typescript](#typescript)
  - [Dart](#dart)
  - [Flutter](#flutter)
  - [Chrome](#chrome)

## Git

To install `git` type:

```shell
sudo apt install git && git config --global credential.helper store
git config --global user.name "your username"
git config --global user.password "your password"
```

## Zsh

In order to install `zsh` on Debian or its deratives, please use:

```shell
sudo apt update && apt install zsh
```

Then type:

```shell
chsh -s /usr/bin/zsh
```

Then log out and log in and start your Terminal.

After this press `2`:

```shell
(2)  Populate your ~/.zshrc with the configuration recommended
     by the system administrator and exit (you will need to edit
     the file by hand, if so desired).
```

## Oh My Zsh

You can install Oh My Zsh with:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Then you should see:

```shell
         __                                     __
  ____  / /_     ____ ___  __  __   ____  _____/ /_
 / __ \/ __ \   / __ `__ \/ / / /  /_  / / ___/ __ \
/ /_/ / / / /  / / / / / / /_/ /    / /_(__  ) / / /
\____/_/ /_/  /_/ /_/ /_/\__, /    /___/____/_/ /_/
                        /____/                       ....is now installed!


Before you scream Oh My Zsh! look over the `.zshrc` file to select plugins, themes, and options.
```

All possible themes are available [here](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes).

In order to enable a theme, set `ZSH_THEME` to the name of the theme in your `~/.zshrc`, before sourcing Oh My Zsh; for example: `ZSH_THEME=robbyrussell` If you do not want any theme enabled, just set `ZSH_THEME` to blank: `ZSH_THEME=""`.

### Plugins

For sake of happiness, add this at `plugins` in your `.zshrc`:

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```shell
fpath+=${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions/src
plugins=(git aliases debian branch github zsh-autosuggestions zsh-syntax-highlighting zsh-completions zsh-interactive-cd zsh-navigation-tools)
```

## Fonts

All the best `NerdFonts` can be found [here](https://www.nerdfonts.com/font-downloads).

Although my winner is the: [Cascaydia Cove Nerd Font](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.3.3/CascadiaCode.zip)

Unpack fonts to /usr/share/fonts/ and rebuild the cache:

```shell
fc-cache -f -v
```

## Powerlevel10k

Clone repository:

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in `~/.zshrc`.

And for `Powerlevel10k instant prompts`, add this to `.zshrc`:

```shell
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi
```

## Build essentials

Type:

```shell
sudo apt install build-essential
```

## Snap

```shell
$ su root
apt update
apt install snapd
```

Re-log and type:

```shell
sudo snap install core
```

## Flatpak

For Flatpak type:

```shell
sudo apt install flatpak gnome-software-plugin-flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

Restart OS and voula.

## GlobalProtect OpenConnect

For non Debian distros, you can use project [GlobalProtect OpenConnect](https://github.com/yuezk/GlobalProtect-openconnect).

In case if you want to install it, type:

```shell
sudo add-apt-repository ppa:yuezk/globalprotect-openconnect
sudo apt-get update
sudo apt-get install globalprotect-openconnect
```

### Debian 12+

For Debian based distros, use this:

```shell
sudo apt get update
sudo apt install openconnect network-manager-openconnect network-manager-openconnect-gnome
```

To test it, use GUI in Gnome or type:

```shell
sudo openconnect --protocol=gp global.protect.server -u user-name
```

## Homebrew

To install `brew`, which is not only for `macOS` developers, type:

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

After this, do:

```shell
(echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/$USER/.zprofile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

## Docker

## Setup

To install type:

```shell
sudo apt-get install \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

sudo mkdir -p /etc/apt/keyrings
```

```shell
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update && sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Add Docker to sudoers

```shell
sudo groupadd docker
sudo usermod -aG docker ${USER} && sudo newgrp docker
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
sudo chmod 666 /var/run/docker.sock
```

### IP Range

In order to change IP range for containers, go to:

```shell
sudo nano /etc/docker/daemon.json
```

Paste:

```json
{
  "bip": "172.24.0.1/24",
  "fixed-cidr": "172.24.0.1/25",
  "insecure-registries": ["registry:32000"]
}
```

Then restart the daemon:

```shell
sudo systemctl daemon-reload && sudo systemctl restart docker
```

### Nerdctl

To install `nerdctl`, use `brew`:

```shell
brew install nerdctl
```

### Portainer

For Portainer, type:

```shell
docker volume create portainer_data \
&& docker run -d -p 8000:8000 -p 9443:9443 \
--name portainer --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data portainer/portainer-ce:latest
```

Then visit: [https://localhost:9443/](https://localhost:9443/).

## QEMU/KVM

### Install QEMU/KVM

For a `QEMU and KVM`, type:

```shell
sudo apt install -y qemu-kvm libvirt-daemon  bridge-utils virtinst libvirt-daemon-system
sudo apt install -y virt-top libguestfs-tools libosinfo-bin  qemu-system virt-manager
```

### Test QEMU/KVM

To test it out, type for example:

```shell
sudo virt-install \
--name deb11 \
--ram 2048 \
--vcpus 2 \
--disk path=/var/lib/libvirt/images/deb11-vm.qcow2,size=20 \
--os-type linux \
--os-variant debian9 \
--network bridge=br1 \
--graphics none \
--console pty,target_type=serial \
--location 'http://ftp.debian.org/debian/dists/bullseye/main/installer-amd64/' \
--extra-args 'console=ttyS0,115200n8 serial'
```

### Bridge network for VMs

In order to make your VM's talk to outside, you need to have Linux bridge:

```shell
sudo nano /etc/network/interfaces
```

And if your main interface is `enp8s0`, add something like this:

```shell
# Primary network interface
auto enp8s0
iface ens3 inet manual

# Bridge definitions
auto br1
iface br1 inet static
bridge_ports enp8s0
bridge_stp off
address 192.168.2.203
network 192.168.2.1
netmask 255.255.255.0
broadcast 192.168.2.250
gateway 192.168.2.101
dns-nameservers 8.8.8.8
```

## Kubernetes

### Kubectl

```shell
sudo apt update \
&& sudo apt install -y ca-certificates curl \
&& sudo curl -fsSLo /etc/apt/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg \
&& echo "deb [signed-by=/etc/apt/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" \
| sudo tee /etc/apt/sources.list.d/kubernetes.list \
&& sudo apt-get update \
&& sudo apt-get install -y kubectl
```

Then add this to .zshrc:

```shell
source <(kubectl completion zsh)
```

If you get an error like `2: command not found: compdef`, then add the following to the beginning of your `~/.zshrc` file:

```shell
autoload -Uz compinit
compinit
```

### VMware Tanzu

Then obtain vSphere plugin in order to use it with Tanzu. And unzip vsphere-plugin to your /usr/bin/ and add:

```shell
echo 'export PATH=$PATH:/usr/bin/vsphere-plugin/bin' >> ~/.zshrc
```

### Helm

Install it through:

```shell
curl https://baltocdn.com/helm/signing.asc | gpg --dearmor | sudo tee /usr/share/keyrings/helm.gpg > /dev/null
sudo apt-get install apt-transport-https --yes
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/helm.gpg] https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

And add completions to `.zshrc`:

```shell
source <(helm completion zsh)
```

### Argo

For both: Workflows and CD, better is to use `brew` in order to install CLI's.

The `argo` stands for `Workflows CLI`, while `argocd` for `ArgoCD`:

```shell
brew install argo argocd
```

## CLI's

### TERRAFORM

For `Terraform` instalation type:

```shell
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

And add it to your `.zshrc`:

```shell
autoload -U +X bashcompinit && bashcompinit
complete -o nospace -C /usr/bin/terraform terraform

zstyle ':completion:*' menu select
fpath+=~/.zfunc
```

### VAGRANT

For `Vagrant` type:

```shell
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install vagrant
```

In case of usage with KVM/QEMU, install this:

```shell
vagrant plugin install vagrant-libvirt && vagrant plugin install vagrant-mutate
```

`Note: That you need to have QEMU/KVM and libvrt installed`.

### AWS CLI

To install AWS CLI type:

```shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin
rm -r aws awscliv2.zip
```

### EKSCTL

In order to install `eksctl` which is the the official CLI for Amazon EKS, use:

```shell
ARCH=amd64
PLATFORM=$(uname -s)_$ARCH

curl -sLO "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$PLATFORM.tar.gz"

# (Optional) Verify checksum
curl -sL "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_checksums.txt" | grep $PLATFORM | sha256sum --check

tar -xzf eksctl_$PLATFORM.tar.gz -C /tmp && rm eksctl_$PLATFORM.tar.gz

sudo mv /tmp/eksctl /usr/local/bin
```

### Azure CLI

This can be found in default repository:

```shell
sudo apt update && sudo apt install azure-cli
```

## Apps

### VSCode

To install it, use:

```shell
sudo apt install wget gpg
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
rm -f packages.microsoft.gpg

sudo apt install apt-transport-https
sudo apt update
sudo apt install code
```

### JetBrains

For `Jetbrains Toolbox`, download binary from: [here](https://www.jetbrains.com/toolbox-app/) and unpack it in `/usr/bin/`.

### Flameshot

For screenshot app like `Lightshoot` on Windows, use this:

```shell
sudo apt install flameshot
```

### Github Desktop

For `Github Desktop`, please type:

```shell
wget -qO - https://apt.packages.shiftkey.dev/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/shiftkey-packages.gpg > /dev/null
sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/shiftkey-packages.gpg] https://apt.packages.shiftkey.dev/ubuntu/ any main" > /etc/apt/sources.list.d/shiftkey-packages.list'
sudo apt update -y && sudo apt install github-desktop
```

## Packages

### Kerberos

Install it via:

```shell
sudo apt install krb5-user -y
```

Then edit the `config`:

```
sudo nano /etc/krb5.conf
```

Like this:

```shell
[libdefaults]
        default_realm = company.local

[realms]
company.local = {
        kdc = DC0.company.local
        admin_server = DC0.company.local
}
[domain_realm]
        .company.local = COMPANY.LOCAL
```

Then use, to log in:

```shell
kinit username@COMPANY.LOCAL
```

Check it with:

```shell
$klist

Ticket cache: FILE:/tmp/krb5cc_1000
Default principal: username@COMPANY.LOCAL

Valid starting       Expires              Service principal
27.05.2022 08:59:22  27.05.2022 18:59:22  krbtgt/COMPANY.LOCAL@COMPANY.LOCAL
renew until 28.05.2022 08:59:17
```

In order to create a keytab an automate it, use:

```shell
ktutil

addent -password -p username@COMPANY.LOCAL -k 1 -e RC4-HMAC
wkt /dir/username.keytab
```

### Oracle Client

In order to install `Oracle Client`, paste this:

```shell
sudo apt install -y unixodbc-dev libaio1
sudo mkdir -p /opt/oracle
cd /opt/oracle/
sudo wget -P /opt/oracle https://download.oracle.com/otn_software/linux/instantclient/19800/instantclient-basic-linux.x64-19.8.0.0.0dbru.zip
sudo wget -P /opt/oracle https://download.oracle.com/otn_software/linux/instantclient/19800/instantclient-sqlplus-linux.x64-19.8.0.0.0dbru.zip
sudo wget -P /opt/oracle https://download.oracle.com/otn_software/linux/instantclient/19800/instantclient-sdk-linux.x64-19.8.0.0.0dbru.zip
sudo unzip instantclient-basic-linux.x64-19.8.0.0.0dbru.zip -d /opt/oracle
sudo unzip instantclient-sqlplus-linux.x64-19.8.0.0.0dbru.zip -d /opt/oracle
sudo unzip instantclient-sdk-linux.x64-19.8.0.0.0dbru.zip -d /opt/oracle
export PATH="$PATH:/opt/oracle/instantclient_19_8"
export LD_LIBRARY_PATH="$LD_LIBRARY_PATH:/opt/oracle/instantclient_19_8"
sudo ldconfig
```

### Microsoft SQL Server ODBC

```shell
sudo su
curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -

#Debian 11
curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list

exit
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get install -y msodbcsql18 msodbcsql17
# optional: for bcp and sqlcmd
sudo ACCEPT_EULA=Y apt-get install -y mssql-tools18
echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.zshrc
source ~/.bashrc
# optional: for unixODBC development headers
sudo apt-get install -y unixodbc-dev

echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> ~/.zshrc && source ~/.zshrc
```

## Languages

### Python

In `Debian 12`, the most recent version is included - `3.11.2`.

Just install `poetry` and `virtualenv` for future isolated deployments:

```shell
sudo apt install python3-virtualenv python3-poetry
```

### Ruby

To install `Rbenv`, type:

```shell
sudo apt update && sudo apt install rbenv
echo 'eval "$(/usr/bin/rbenv init - zsh)"' >> ~/.zshrc
```

To install `Ruby`:

```shell
# List latest stable versions:
rbenv install -l

# List all local versions:
rbenv install -L

# Install a Ruby version:
rbenv install 3.1.2
```

And you should see something like this:

```shell
Downloading ruby-3.1.2.tar.gz...
-> https://cache.ruby-lang.org/pub/ruby/3.1/ruby-3.1.2.tar.gz
Installing ruby-3.1.2...
Installed ruby-3.1.2 to /home/USER/.rbenv/versions/3.1.2
```

Now set your `Ruby` build as default:

```shell
rbenv global 3.1.2   # Set the default Ruby version for this machine
# or:
rbenv local 3.1.2    # Set the Ruby version for this directory
```

Last but not least, install `Bundler`:

```shell
gem install bundler
```

And voula!

### Crystal

`Crystal` - the compiled and typed little Ruby's brother, can be installed on Debian 12 using two methods:

- default setup via .sh
- or through `apt`.

Default one:

```shell
curl -fsSL https://crystal-lang.org/install.sh | sudo bash
```

Apt (prefered):

```shell
echo 'deb http://download.opensuse.org/repositories/devel:/languages:/crystal/Debian_Testing/ /' | sudo tee /etc/apt/sources.list.d/devel:languages:crystal.list
curl -fsSL https://download.opensuse.org/repositories/devel:languages:crystal/Debian_Testing/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/devel_languages_crystal.gpg > /dev/null
sudo apt update
sudo apt install crystal
```

The following packages are not required, but recommended for using the respective features in the standard library:

```shell
sudo apt install libssl-dev      # for using OpenSSL
sudo apt install libxml2-dev     # for using XML
sudo apt install libyaml-dev     # for using YAML
sudo apt install libgmp-dev      # for using Big numbers
sudo apt install libz-dev        # for using crystal play
```

### Go

Remove any old builds, and unpack the latest one.

At the moment of writing, the latest build was `1.20.3`:

```shell
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.20.3.linux-amd64.tar.gz
mkdir -p ~/go
```

Add GO to your `PATH` in .`zshrc`:

```shell
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

To check it, type:

```shell
$ go version
go version go1.20.3 linux/amd64
```

### Rust

The best way to install `Rust` on `unix-like OS`, is to use `rustup` from official [website](https://www.rust-lang.org/learn/get-started):

```shell
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

For future updates you can use:

```shell
rustup update
```

For the sake of happiness, add this to `.zshrc`:

```shell
# Rust
export PATH=$HOME/.cargo/bin:$PATH
```

### Nim

To install `Nim`, type:

```shell
curl https://nim-lang.org/choosenim/init.sh -sSf | sh
```

Add to `PATH` in `.zshrc`:

```shell
export PATH=/home/$USER/.nimble/bin:$PATH
```

### Scala

For Scala, type:

```shell
curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs && chmod +x cs && ./cs setup
```

And install Java:

```shell
sudo apt install default-jre && sudo apt install default-jdk
```

Then check installed builds:

```shell
sudo update-alternatives --config java && sudo update-alternatives --config javac
```

Add to `.zshrc`:

```shell
echo "export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64" >> ~/.zshrc
```

### Elixir

Just type:

```shell
sudo apt install elixir
```

And add to `.zshrc`:

```shell
echo "export PATH=$PATH:/usr/bin/elixir >> ~/.zshrc"
```

### Typescript

For Typescript, please type:

```shell
sudo apt update
sudo apt install nodejs npm yarn && npm install typescript -g
```

### Dart

In order to isntall Flutter, type:

```shell
sudo apt update
sudo apt  install apt-transport-https
wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg
echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | sudo tee /etc/apt/sources.list.d/dart_stable.list
sudo apt update && sudo apt install dart
```

Then add it to your `.zshrc`:

```shell
export PATH="$PATH:/usr/lib/dart/bin"
```

### Flutter

For Flutter use:

```shell
sudo apt update && sudo apt install clang cmake ninja-build pkg-config libgtk-3-dev liblzma-dev
sudo snap install flutter --classic
flutter sdk-path && flutter --disable-telemetry
```

### Chrome

For Chrome, that it is needed for Dart/Flutter/Android SDK, type:

```shell
su -

cat << EOF > /etc/apt/sources.list.d/google-chrome.list
deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main
EOF

wget -O- https://dl.google.com/linux/linux_signing_key.pub |gpg --dearmor > /etc/apt/trusted.gpg.d/google.gpg

sudo apt update && sudo apt install google-chrome-stable
```

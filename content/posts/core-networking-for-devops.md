---
title: "Core networking for DevOps and SRE's"
date: 2025-09-13
tags: ["devops", "sre", "networking", "infrastructure"]
language: "en"
---

![Pic](/img/devops_1.png)

## 📃 Table of Contents

- [📃 Table of Contents](#-table-of-contents)
- [🤖 Introduction](#-introduction)
  - [The OSI Model](#the-osi-model)
- [⚗️ IP Addresses and Ports](#️-ip-addresses-and-ports)
  - [Difference between TCP and UDP](#difference-between-tcp-and-udp)
  - [Ping](#ping)
  - [DNS Resolution](#dns-resolution)
  - [Traceroute](#traceroute)
  - [Port Connectivity](#port-connectivity)
  - [Interfaces](#interfaces)
- [📶 IP Addresses and Subnets](#-ip-addresses-and-subnets)
  - [Subnet sizes](#subnet-sizes)
  - [Calculating number of hosts in a subnet](#calculating-number-of-hosts-in-a-subnet)
  - [Private vs Public IP Addresses](#private-vs-public-ip-addresses)
  - [How to check my external IP address?](#how-to-check-my-external-ip-address)
  - [NAT](#nat)
  - [Practical Subnetting](#practical-subnetting)
- [DNS](#dns)
  - [Caching and TTL](#caching-and-ttl)
  - [Example DNS Configuration](#example-dns-configuration)
  - [Homelabs and DNS?](#homelabs-and-dns)
- [♾️ Basic security considerations](#️-basic-security-considerations)
- [💎 Load Balancing and High Availability](#-load-balancing-and-high-availability)
  - [Load balancing in Docker and Kubernetes](#load-balancing-in-docker-and-kubernetes)
    - [Kubernetes](#kubernetes)
    - [Docker Swarm](#docker-swarm)
  - [Other Load Balancing Techniques](#other-load-balancing-techniques)
- [🐳 Containers and networking](#-containers-and-networking)
- [☁️ Few words about Cloud Networking](#️-few-words-about-cloud-networking)
- [🐖 To be continued...](#-to-be-continued)
- [📝 Notes and references](#-notes-and-references)

## 🤖 Introduction

This is **some introductory material for future DevOps and SRE engineers** to get familiar with core networking concepts. Understanding networking is crucial for managing and troubleshooting infrastructure effectively.

Although this guide is not exhaustive, it covers essential topics that every DevOps and SRE should know, especially the stuff around how to work with networking using CLI's and common tools.

My personal view of being the `DevOps` or `SRE` is more inclined towards `Infrastructure as Code` and `Automation`, `Observability`, `CI/CD` and core networking rather than typical `SysOps` with some `software engineering` skills.

Note:

- This materials is not a replacement for formal networking courses or certifications.
- Practical experience and hands-on labs are highly recommended to solidify your understanding of networking concepts.
- It was written in past mainly for my own learning purpuroses, so excuse any possible mistakes or inaccuracies.
- I used Claude Sonnet 3.7 and GPT-4.1 to help me re-write and structure the content of my original notes to be on par with [Networking Fundamentals for Developers](https://devops-daily.com/guides/networking-fundamentals) ToC.
- Notes were really old, dated back to my technical high-school days (pre 2010), so lot of stuff had to be rewritten.

### The OSI Model

The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and implement network protocols in seven layers. Each layer serves a specific function and communicates with the layers directly above and below it:

- **Layer 0**: Network Interface (Hardware and drivers)
- **Layer 1**: Physical Layer (Cables, switches, and physical transmission)
- **Layer 2**: Data Link Layer (MAC addresses, switches)
- **Layer 3**: Network Layer (IP addresses, routing)
- **Layer 4**: Transport Layer (TCP/UDP, port numbers)
- **Layer 5**: Session Layer (Establishing, managing, and terminating sessions)
- **Layer 6**: Presentation Layer (Data translation, encryption)
- **Layer 7**: Application Layer (End-user applications and protocols like HTTP, FTP)

But you need to remember that the OSI model is a theoretical framework, and real-world networking protocols often do not fit neatly into these layers.

The OSI model is greatly explained [here](https://www.networkacademy.io/ccna/network-fundamentals/understanding-the-osi-model).

## ⚗️ IP Addresses and Ports

Every connection between devices on a network uses IP addresses and ports to identify the source and destination of the data being transmitted.

You can check what connections are currently established on your machine using the following commands:

```shell
# On Linux and macOS
netstat -tuln

# On Windows
$ netstat -an

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:22             0.0.0.0:0              LISTENING
  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING
  TCP    0.0.0.0:1433           0.0.0.0:0              LISTENING
```

In this case, you can see that there are three services listening on ports `22` (SSH), `443` (HTTPS), and `1433` (MSSQL running inside container).

### Difference between TCP and UDP

TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) are two core protocols used for transmitting data over the internet:

- TCP ensures data is in order and without errors, making it reliable but slower.
- UDP is faster but does not guarantee delivery or order, making it suitable for real-time applications like video streaming or online gaming.

### Ping

In order to check reachability of a host on an IP network, you can use the `ping` command. It sends ICMP Echo Request messages to the target host and waits for Echo Reply messages.

```shell
ping google.com
```

### DNS Resolution

DNS (Domain Name System) translates human-readable domain names (like `google.com`) into IP addresses that computers use to identify each other on the network.

To look-up DNS records, you can use the `nslookup` or `dig` commands:

```shell
# Using nslookup
nslookup google.com

# Using dig
dig google.com
```

### Traceroute

In order to trace the path that packets take from your machine to a destination host, you can use the `traceroute` command (or `tracert` on Windows):

```shell
# On Linux and macOS
traceroute google.com

# On Windows
tracert google.com
```

### Port Connectivity

It can be done using `telnet` or `nc` (netcat) commands to check if a specific port on a remote host is open and reachable:

```shell
# Using telnet
telnet google.com 80

# Using nc
nc -zv google.com 80
```

### Interfaces

To heck what network interfaces are available on your machine, you can use the following commands:

```shell
# On Linux
ip addr show

# On Windows
ipconfig /all
```

In order to check routing table, you can use:

```shell
# On Linux
ip route show

# On Windows
route print
```

## 📶 IP Addresses and Subnets

IP addresses are unique identifiers assigned to devices on a network. They allow devices to communicate with each other and are essential for routing traffic across the internet.

The basic structure of an IP address consists of four octets (for IPv4) separated by periods, such as `192.168.1.102` or `172.17.0.2`. Each octet can range from `0` to `255`, providing a total of approximately 4.3 billion unique addresses in IPv4.
To check your current IP address, you can use the commands mentioned earlier for checking network interfaces.

```shell
$ ip addr show

(...)
36: eth0@if37: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue state UP
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

And one very important concept to understand is subnetting. Subnetting is the practice of dividing a larger network into smaller, more manageable sub-networks (subnets). This helps improve network performance, security, and organization.

The specific fragment of our IP address `/16` is called CIDR notation (Classless Inter-Domain Routing) and indicates the subnet mask.

So, while our address is `172.17.0.2/16`, which means that the first 16 bits (the first two octets) are used for the network portion of the address, and the remaining bits are used for host addresses within that network.

So:

- Network portion: `172.17`
- Host portion: `0.2`
- Available IP range for hosts in this subnet would be from `172.17.0.0` to `172.17.255.255`.

And you lose some addresses for network and broadcast addresses:

- Network address: `172.17.0.0`
- Broadcast address: `172.17.255.255`

### Subnet sizes

The most common subnet sizes are:

| CIDR Notation | Subnet Mask       | Number of Hosts | Description                |
|---------------|-------------------|-----------------|----------------------------|
| /24           | 255.255.255.0     | 256             | Class C subnet             |
| /16           | 255.255.0.0       | 65,536          | Class B subnet             |
| /8            | 255.0.0.0         | 16,777,216      | Class A subnet             |

### Calculating number of hosts in a subnet

In order to calculate subnet sizes and ranges, you can use online tools like [Subnet Calculator](https://www.subnet-calculator.com/) or command-line tools like `ipcalc`:

```shell
ipcalc 172.17.0.2/16
```

But of course you can do it manually as well, by understanding binary math e.g. to calculate number of usable IP addresses in a subnet given a CIDR like `/27`:

- **Substract the CIDR from 32** (total bits in IPv4): `32 - 27 = 5` host bits.
- **Calculate 2 to the power** of host bits to get the total number of addresses: `2^5 = 32` total addresses.
- **Substract 2** from the total addresses to get the usable addresses: `32 - 2 = 30` usable addresses.

In short, the table above, can be extended to:

| CIDR  | Subnet Mask       | # of Hosts | Typical Use Case                          |
|-------|-------------------|------------|-------------------------------------------|
| /8    | 255.0.0.0         | 16,777,216 | Very large networks (e.g., 10.0.0.0/8)    |
| /16   | 255.255.0.0       | 65,536    | Medium-sized networks (e.g., 172.16.0.0/16)|
| /12   | 255.240.0.0       | 1,048,574  | Large private networks (e.g., 10.0.0.0/12)|
| /20   | 255.255.240.0     | 4,094      | Medium-sized subnets, cloud VPCs          |
| /21   | 255.255.248.0     | 2,046      | Cloud subnets, branch offices             |
| /22   | 255.255.252.0     | 1,022      | Cloud subnets, small data centers         |
| /23   | 255.255.254.0     | 510        | Two contiguous /24s, small LANs           |
| /25   | 255.255.255.128   | 126        | Half of a /24, small segments             |
| /26   | 255.255.255.192   | 62         | Small VLANs, point-to-point links         |
| /27   | 255.255.255.224   | 30         | Very small VLANs, DMZs, device groups     |
| /28   | 255.255.255.240   | 14         | Device clusters, point-to-point, labs     |
| /29   | 255.255.255.248   | 6          | WAN links, router interconnects           |
| /30   | 255.255.255.252   | 2          | Point-to-point links (router-router)      |

### Private vs Public IP Addresses

So as you probably might think, we have two types of IP addresses, **private** and **public**:

1. Most home routers assign **Class C** private IP addresses in the range of `192.168.0.0` to `192.168.255.255`.
2. The **Class B** private IP addresses are in the range of `172.16.0.0` to `172.31.255.255` (e.g. Docker uses 172.17.0.0/16 for its containers).
3. The **Class A** private IP addresses are in the range of `10.0.0.0` to `10.255.255.255` (large organizations often use these).

### How to check my external IP address?

In order to do use, you can for example use `curl` to query an external service that returns your public IP address:

```shell
$ curl ifconfig.me
185.21.11.177 # Obviously fake IP
```

### NAT

**NAT (Network Address Translation)** is a networking technique used to modify network address information in the IP header of packets while they are in transit across a router or firewall. Its primary purpose is to allow multiple devices on a private network to share a single public IP address when accessing external networks, such as the internet.

With NAT, devices inside a local network use private IP addresses (like 192.168.x.x or 10.x.x.x) that are not routable on the public internet. When these devices communicate with external servers, the NAT device (usually a router) translates their private IP addresses to its own public IP address. It keeps track of these connections so that when responses come back, it knows which internal device should receive each response.

NAT improves security by hiding internal network structure and conserves public IP addresses, which are limited in number. There are several types of NAT, including static NAT (one-to-one mapping), dynamic NAT (many-to-many mapping), and the most common, **PAT** (**Port Address Translation**, also known as "NAT overload"), which allows many devices to share a single public IP using different port numbers.

### Practical Subnetting

So taking all of this into account, in other words:

- My public IP would be: *185.21.11.177*
- My private IP would be: *192.168.1.20*, where my network address of my router is *192.168.1.0* and the broadcast address is *192.168.1.255*.
- And separate private network with *10.0.0.0/24* subnet for my VMs.
  - This can be achieved by using **VLANs** (Virtual LANs) to segment network traffic.
  - Not all home routers support VLANs or advanced subnetting. You’ll need to check your router’s documentation or admin interface.
  - VLAN configuration is more common on routers running custom firmware (like OpenWRT, DD-WRT) or on higher-end models.

Here is an ASCII diagram to illustrate practical subnetting:

```ascii
                [ Internet ]
                     |
              +---------------+
              | Main Router   |
              | 192.168.1.1   |
              +---------------+
                     |
        +-----------------------------+
        |                             |
 [192.168.1.x devices]        +-------------------+
 (PCs, phones, etc.)          | 2nd Router/VLAN   |
   192.168.1.2-254            | WAN: 192.168.1.2  |
                              | LAN: 10.0.0.1     |
                              +-------------------+
                                      |
                          +--------------------------+
                          | 10.0.0.x devices         |
                          | (IoT, guests, etc.)      |
                          | 10.0.0.2-254             |
                          +--------------------------+
```

Or more complex scenario:

```ascii
                [ Internet ]
                     |
              +---------------------+
              |    Main Router      |
              |  (Core Firewall)    |
              +---------------------+
                     |
        +--------------------------+-------------------------------+-------------------------------+
        |                          |                               |                               |
+-------------------+     +---------------------+     +---------------------+     +---------------------+
| Main Network      |     | Web Servers         |     | Apps & Containers   |     | Databases           |
| 192.168.1.0/27    |     | 10.0.1.0/24         |     | 10.0.2.0/16         |     | 10.0.3.0/27         |
| (e.g. .1 = router |     | (e.g. .1 = gateway) |     | (e.g. .1 = gateway) |     | (e.g. .1 = gateway) |
|  .2 = notebook)   |     | .2-.254 = servers   |     | .2-.65534 = apps    |     | .2-.30 = db hosts   |
+-------------------+     +---------------------+     +---------------------+     +---------------------+
```

Even with a such **segmented network architecture**, there are still challenges to address and you will have occasional connectivity issues between different subnets, so proper routing rules and firewall policies must be implemented to allow or restrict traffic as needed.

For example there could be a scenario where you would not be able to reach some networks but no others, so you will have to add for example temporary routes using:

```shell
ip route add 10.0.1.0/24 via 192.168.1.1
```

Remember that you can always check your routing table using: `ip route show`.

## DNS

DNS as mentoned before is used to resolve domain names to IP addresses. In a complex network setup with multiple subnets, you might have your own internal DNS server to manage local domain names and their corresponding IP addresses.

As already mentioned, you can use `nslookup` or `dig` to query DNS records:

```shell
$ nslookup morele.net

Server:         192.168.127.1
Address:        192.168.127.1#53

Non-authoritative answer:
Name:   morele.net
Address: 104.18.10.64
Name:   morele.net
Address: 104.18.11.64
```

```shell
$ dig morele.net

; <<>> DiG 9.18.41 <<>> morele.net
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 45397
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;morele.net.                    IN      A

;; ANSWER SECTION:
morele.net.             0       IN      A       104.18.10.64
morele.net.             0       IN      A       104.18.11.64
```

The `dig` offers more detailed output compared to `nslookup`, including sections for the question, answer, authority, and additional information.

And as you can notice, both commands return two IP addresses for the domain `morele.net`, indicating that it uses multiple A records for load balancing or redundancy.

The `A` stands for Address record, which maps a domain name to an IPv4 address. There are also other types of DNS records, such as:

- **AAAA**: Maps a domain name to an IPv6 address.
- **CNAME**: Canonical Name record, which maps an alias name to the true or canonical domain name.
- **MX**: Mail Exchange record, which specifies the mail server responsible for receiving email for the domain.
- **TXT**: Text record, which can hold arbitrary text data, often used for verification purposes or to store SPF (Sender Policy Framework) records.
- **NS**: Name Server record, which indicates the authoritative DNS servers for the domain.
- **SRV**: Service record, which specifies the location of services (like SIP or XMPP) for the domain.
- and others...

Once you dig for example Github, you will notice that it uses CNAME (Canonical Name) records to point to other domain names:

```shell
$ dig www.github.com CNAME

;; ANSWER SECTION:
www.github.com.         0       IN      CNAME   github.com.
```

### Caching and TTL

The DNS system uses caching to improve performance and reduce latency. When a DNS resolver looks up a domain name, it stores the result in its cache for a specified period, known as the **TTL (Time to Live)**.

So sometimes when you change DNS records, it may take some time for the changes to propagate due to caching and the only way to speed it up if possible is to use:

```shell
# Windows
ipconfig /flushdns
```

```shell
# Linux
sudo systemd-resolve --flush-caches
```

### Example DNS Configuration

Here is an example of a simple DNS configuration using BIND (Berkeley Internet Name Domain) for a local network:

```bash

zone "example.local" {
    type master;
    file "/etc/bind/zones/db.example.local";
};
```

And the corresponding zone file (`db.example.local`):

```bash
$TTL    604800
@       IN      SOA     ns1.example.local. admin.example.local. (
                              2024091301         ; Serial
                              604800             ; Refresh
                              86400              ; Retry
                              2419200            ; Expire
                              604800 )           ; Negative Cache TTL
;
@       IN      NS      ns1.example.local.
ns1     IN      A       192.168.1.10
www     IN      A       192.168.1.20
api     IN      A       192.168.1.30
```

**But remember that DNS configuration can vary significantly based on the DNS server software being used and the specific requirements of your network and hope that the DevOps guy, is not going to be responsible for managing DNS servers as well** 🪬.

### Homelabs and DNS?

For homelab purposes, you can always use just a simple `hosts` (or `/etc/hosts` on Linux) file to map hostnames to IP addresses without setting up a full DNS server:

```plaintext
192.168.1.10 ns1.example.local
192.168.1.20 www.example.local
192.168.1.30 api.example.local
192.168.1.40 example.local
127.0.0.1 k3d.local
```

Or you can use lightweight DNS servers like **dnsmasq** or **Pi-hole** to manage DNS for your homelab network. These tools can provide DNS resolution, DHCP services, and ad-blocking capabilities in a simple and efficient manner.

For example, here is a config snippet for `dnsmasq`:

```bash
# /etc/dnsmasq.conf

address=/example.local/192.168.1.40
address=/ns1.example.local/192.168.1.10
address=/www.example.local/192.168.1.20
address=/api.example.local/192.168.1.30
```

## ♾️ Basic security considerations

When configuring networking for DevOps and SRE tasks, it's crucial to consider security aspects to protect your infrastructure and data:

- **While there is usually some kind of** `SecOps Team`, you must need to know how to enable firewall and allow or deny certain traffic.
- **Firewalls**: Use firewalls (like `iptables`, `ufw`, or cloud provider firewalls) to control incoming and outgoing traffic based on predefined security rules. Only allow necessary ports and protocols.
- **VPNs**: Use Virtual Private Networks (VPNs) to secure remote access to your infrastructure. VPNs encrypt traffic between the client and the server, protecting sensitive data from interception.
- **SSH Security**: Use SSH keys for authentication instead of passwords. Disable root login and use strong passphrases for SSH keys.
- **Network Segmentation**: Segment your network into different zones (e.g., public, private, DMZ) to limit the spread of potential attacks.

While `Alpine` does not come with a firewall enabled by default, you can install and configure `iptables` or use `nftables` for more advanced firewall management. The same applies to most container images, so you need to be aware of that.

But usually Alpine is used only in containers, while hosts use for example `Ubuntu Server` or `CentOS`.

On the example of Ubuntu, we can use `ufw` (Uncomplicated Firewall) to manage firewall rules easily:

```shell
# Check if ufw is installed
sudo ufw status

# Enable ufw
sudo ufw enable

# Default deny incoming traffic
sudo ufw default deny incoming

# Default allow outgoing traffic
sudo ufw default allow outgoing

# Allow SSH (port 22)
sudo ufw allow 22/tcp

# Allow HTTP (port 80) and HTTPS (port 443)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow to access from specific addresses only to MSSQL port 1443
sudo ufw allow from 10.0.32.3 to any port 1443

# Allow to access from specific subnet to PostgreSQL port 5432
sudo ufw allow from 10.0.1.0/24 to any port 5432
```

Those are only core concepts that you must be aware of, but security is a vast topic and requires continuous learning and adaptation to new threats and vulnerabilities. Always stay updated with the latest security best practices and guidelines relevant to your specific environment and technologies in use.

## 💎 Load Balancing and High Availability

This is pretty much on of the most important parts of networking for DevOps and SRE's - The High Availability (HA) and Load Balancing (LB) concepts.

Where we want to make sure that our services are always available and can handle high traffic loads without downtime.

So first of first, in order to check how much traffic is coming to our services, we can use monitoring tools like **Prometheus** and **Grafana** to visualize network traffic and performance metrics.

Then we can use load balancers to distribute incoming traffic across multiple servers or instances. This helps prevent any single server from becoming overwhelmed with requests, ensuring better performance and reliability.

In order to check the 'connection load' we can use `netstat` to check the number of active connections to our service:

```shell
$ netstat -an | grep :80 | grep ESTABLISHED | wc -l

356123 # Number of established connections to port 80
```

In this case we can assume that our web server is handling `356123` active connections, which in a real-world scenario would be a lot but not great or terrible either.

So to implement load balancing, we can use tools like **HAProxy**, **Nginx**, **Taefik**, or cloud-based load balancers provided by AWS, Azure, or GCP.

But while on-premise, the **Nginx** is one of the most popular choices for load balancing HTTP and HTTPS traffic:

```nginx
# /etc/nginx/sites-available/load_balancer.conf
upstream backend {
    server 10.0.1.80:8080;
    server 10.0.1.81:8081;
    server 10.0.1.81:8082;
}

server {
    listen 80;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```

```shell
# Enable the load balancer configuration
sudo ln -s /etc/nginx/sites-available/load_balancer.conf /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx to apply changes
sudo systemctl reload nginx
```

Where we can define multiple backend servers in the `upstream` block, and Nginx will distribute incoming requests to these servers based on the default round-robin method, but it can be changed to other methods as well (e.g. weighted round robin or with least connections; more prefered actually).

Please note that in real production scenario you will also not only add health checks but also SSL termination:

```nginx
server {
    listen 443 ssl;
    server_name your.corporate.domain;

    ssl_certificate     /etc/nginx/certs/corporate.crt;
    ssl_certificate_key /etc/nginx/certs/corporate.key;
    # If you have a CA bundle:
    ssl_trusted_certificate /etc/nginx/certs/ca_bundle.crt;

    location / {
        proxy_pass http://your_backend;
    }
}
```

### Load balancing in Docker and Kubernetes

Both have their own built-in load balancing mechanisms, but they can also integrate with external load balancers.

#### Kubernetes

In case of Kubernetes, it has a built-in service type called `LoadBalancer` that can automatically provision an external load balancer (if supported by the cloud provider) to distribute traffic to pods.

There is also a `HPA` (Horizontal Pod Autoscaler) that can automatically scale the number of pod replicas based on CPU utilization or other metrics, helping to handle increased traffic loads.

#### Docker Swarm

**Swarm**, has also built-in load balancing capabilities. When you create a service in Docker Swarm, it automatically distributes incoming requests across the available replicas of that service:

```yml
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    deploy:
      replicas: 3
      update_config:
        parallelism: 2
        delay: 10s
      restart_policy:
        condition: on-failure
```

### Other Load Balancing Techniques

For more advanced load balancing techniques, you can also consider:

- **DNS Load Balancing**: Using DNS to distribute traffic across multiple IP addresses for a single domain.
- **Anycast**: Routing traffic to the nearest or best-performing server based on network topology.
- **Global Load Balancing**: Distributing traffic across multiple data centers or geographic locations for improved performance and redundancy.
- **Content Delivery Networks (CDNs)**: Using CDNs to cache and deliver content from edge locations closer to users, reducing latency and improving load times.

## 🐳 Containers and networking

**Containers** use virtual networking to allow communication between containers and the host system. Docker, for example, creates a default bridge network that allows containers to communicate with each other using their IP addresses.

Typically, **Docker** assigns IP addresses from the `172.17.0.0/16` subnet to containers on this bridge network.

While containers can communicate using their IP addresses, it's often more convenient to use container names as hostnames. Docker's embedded DNS server resolves these names to the appropriate IP addresses.

**Kubernetes (K8s)** extends this concept further by providing a flat network namespace for all containers, allowing them to communicate with each other using their names without needing to know their IP addresses.
But it also uses different networking models like **CNI (Container Network Interface)** to manage pod-to-pod and pod-to-service communication, and it typically uses large address spaces like `10.244.0.0/16`.

## ☁️ Few words about Cloud Networking

When working with cloud providers like AWS, Azure, or GCP, understanding their networking concepts is crucial. Each provider has its own terminology and services for managing networking, but the most common idea is that it is still based on core networking principles.

So I will not go into details here (because otherwise I would need to write a book).

That's why I will mention few core concepts:

- **VPC (Virtual Private Cloud)**: A logically isolated section of the cloud where you can launch resources in a virtual network that you define.
- **Subnets**: Segments of a VPC's IP address range where you can place resources, same as on-premise.
- **Security Groups**: Virtual firewalls that control inbound and outbound traffic to resources.
- **Load Balancers**: Distribute incoming traffic across multiple resources to ensure high availability and reliability.

For more details, you can refer to the documentation of each cloud provider.

## 🐖 To be continued...

## 📝 Notes and references

- [Introduction to Networking](https://www.networkacademy.io/ccna/network-fundamentals/introduction-to-networking)
- [Networking Fundamentals for Developers](https://devops-daily.com/guides/networking-fundamentals)

---
layout: post
title: Spin default users and database on fly in MongoDB using Docker Compose
date: 2022-12-01
category: ["docker", "compose", "mongodb"]
---

![Docker](/img/DockerGopher.png)

<!-- TOC -->
  * [Purpose](#purpose)
  * [Theory](#theory)
  * [First things first](#first-things-first)
  * [Docker compose](#docker-compose)
  * [Initialize databases and users at stack startup](#initialize-databases-and-users-at-stack-startup)
  * [Final code](#final-code)
  * [Running our sample database](#running-our-sample-database)
  * [Result](#result)
<!-- TOC -->

## Purpose

There are situations, when you need quick and re-deployable database that doesn't need to be installed on your main OS or at external host in pre-production state, having all pre-production databases, users and tables or schema ready for development.

Since there is no real need to have full cluster working on K8s for this, it's easier to deploy e.g. MongoDB with `docker compose` and remove it or reset into 'default state' during development process everytime you need.

## Theory

Imagine you have to work with an ETL that is going to fetch data from e.g. SQL Server and store it in MongoDB.

For this you would have database that you can spin whenever you want, having always its default databases in initial state.

Of course, you can create tables, databases on fly during ETL startup, but you can always create pre-prod database setup within the docker compose file.

## First things first

First, you need to create space/folder:

```shell
cd /home/user/repos
mkdir mongodb-dev

cd mongodb-dev
```

And you need to have `Docker` and `Docker Compose` installed on your OS.

## Docker compose

First, we need to create`docker-compose.yml` file, which is our starting point:

```shell
cd /home/user/repos/mongodb-dev

touch docker-compose.yml 
```

Then we can start editing file within our IDE/Code Editor (e.g. Visual Studio Code):

```shell
code docker-compose.yml
```

Our simple MongoDb setup, will use one service, with two persistent volumes for:

- /data/
- /logs/

The first paragraph in `docker-compose.yml` is always about `version` of file that is going to be used by engine.

About versioning, you can read more up [here](https://docs.docker.com/compose/compose-file/compose-versioning/).

For this article, I will use `version: '3.7'`.

The initial base of our `compose file` looks like this:

```yml
version: '3.7'

services:
  mongodb:
    image: mongo:latest
    restart: on-failure
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT:-mongodb}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD:-mongodb}
      MONGO_INITDB_ROOT_DATABASE: ${MONGO_ROOT_DB:-mongodb}
    networks:
      - services
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
      - mongodb-log:/var/log/mongodb

volumes:
  mongodb-data:
    driver: local
  mongodb-log:
    driver: local

networks:
  services:
    name: ${MONGO_NETWORK:-mongodb.network}
```

We create `service` with a name `mongodb`, whi use the latest `mongo` image from `DockerHub`.

Then, we set default user using default overrides, that are mapped to our custom ENV's:

- MONGO_INITDB_ROOT_USERNAME
- MONGO_INITDB_ROOT_PASSWORD
- MONGO_INITDB_ROOT_DATABASE

In the last part, we initialize network and setup port forwarding. Map data inside container into external storage/volume to allow data persistence.

This trick with `${VARIABLE:-secret}` allows us to spin database without having to setup proper .ENV in rather .env files or in OS ~/.profile.

In other words, if there is no .env given in root directory or variables are empty - `docker-compose` will use default secrets stored in plain `yaml`. 

It's good for development purposes, but storing any default passwords in plan code, is not allowed in production.

## Initialize databases and users at stack startup

In order to built database everytime we spin clean build, we need to create `.sh` file in our project directory:

```shell
touch mongo-init.sh
```

Then we link file to docker-entrypoint by adding to volumes this line:

```yml
volumes:
  - ./mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh:ro
```

Then we add our users passwords into `environment` section e.g.:

```yml
SALES_PASSWORD: ${SALES_PASSWORD:-sales}
WAREHOUSE_PASSWORD: ${WAREHOUSE_PASSWORD:-warehouse}
``` 

Then, we place proper self-exploratory code in `.sh` file:

```sh
set -e

mongo <<EOF
db = db.getSiblingDB('sales')

db.createUser({
  user: 'sales',
  pwd: '$SALES_PASSWORD',
  roles: [{ role: 'readWrite', db: 'sales' }],
});
db.createCollection('receipts')
db.createCollection('documents')
db.createCollection('invoices')

db = db.getSiblingDB('warehouse')

db.createUser({
  user: 'warehouse',
  pwd: '$WAREHOUSE_PASSWORD',
  roles: [{ role: 'readWrite', db: 'warehouse' }],
});
db.createCollection('documents')
db.createCollection('stocks')
db.createCollection('invoices')
db.createCollection('orders')

EOF
```

## Final code

Final `docker-compose.yml` file, should look similar to this one:

```yml
version: '3.7'

services:
  mongodb:
    image: mongo:latest
    restart: on-failure
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT:-mongodb}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD:-mongodb}
      MONGO_INITDB_ROOT_DATABASE: ${MONGO_ROOT_DB:-mongodb}
      SALES_PASSWORD: ${SALES_PASSWORD:-sales}
      WAREHOUSE_PASSWORD: ${WAREHOUSE_PASSWORD:-warehouse}
    networks:
      - services
    ports:
      - "27017:27017"
    volumes:
      - ./mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh:ro
      - mongodb-data:/data/db
      - mongodb-log:/var/log/mongodb

volumes:
  mongodb-data:
    driver: local
  mongodb-log:
    driver: local

networks:
  services:
    name: ${MONGO_NETWORK:-mongodb.network}
```

## Running our sample database

In order to start the stack, type:

```shell
docker compose up -d
```

In order to start or stop:

```shell
docker compose stop
docker compose start
```

In order to remove containers:

```shell
docker compose down
```

In order to destroy volumes along with containers, we type:

```shell
docker compose down -v
```

## Result

If everything is okay, we should see something like this:


![Screenshot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wov4e4aqe5xcb0nibhzf.png)

And be able to join our instance with user and password given in our `compose-file`.
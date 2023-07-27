# Multi Git Repo

A Git command line to manage multiple git repositories at once.

## Use case

If you work in a microservices environment, with multiple repositories (mnulti repo), you have to work on several projects. Switching from one branch to another, managing them or keeping them updated can be tedious and with a high probability of forgetfulnesses

This module aims to replace this :
````bash
$ cd apps/project1
$ git pull
$ cd apps/project2
$ git pull
$ cd apps/project3
$ git pull
$ cd lib/project4
$ git pull
$ cd lib/project5
$ git pull
...
````
by that :
````bash
$ mgit pull
````
the same goes for fetch, branch, checkout, etc...

## Install

### Globally
````bash
$ npm install -g mgitrepo
````

### Locally
````bash
$ npm install mgitrepo
````

## How to use locally
````bash
$ ./node_modules/.bin/mgit [command]
````
or if you add in your script section in package.json
````json
...
"scripts": {
  ...
  "mgit": "mgit",
  ...
},
...
````
````bash
$ npm run mgit [command]
````


## Configuration

mgit will try to read its configuration file in project root directory.

This file must be named `.mgit.json` and be in json format.

````json
[
  {
    "url": "https://github.com/path/main-project.git",
    "name": "main-project",
    "path": "./"
  },
  {
    "url": "https://github.com/path/project1.git",
    "name": "project1",
    "path": "./apps/project1"
  },
  {
    "url": "https://github.com/path/project2.git",
    "name": "project2",
    "path": "./apps/project2"
  },
  {
    "url": "https://github.com/path/project3.git",
    "name": "project3",
    "path": "./apps/project3"
  },
  {
    "url": "https://github.com/path/project4.git",
    "name": "project4",
    "path": "./lib/project4"
  },
  {
    "url": "https://github.com/path/project5.git",
    "name": "project5",
    "path": "./lib/project5"
  }
]
````

* url: the repository URL
* name: the name by which you want to identify the project
* path: the path where you want to clone the repository or the path where it is located

## Available commands

### Init cloning

````bash
mgit clone
````
Clone all repositories to their relative paths

### All git commands

````bash
mgit [git command]
````
For example:

````bash
mgit status
mgit branch
mgit checkout -b newbranch
mgit checkout otherbranch
mgit add .
mgit commit -m "New feature"
````
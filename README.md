# Project Template Node JS

This repository contains a template for a [Node JS](https://nodejs.org/en/) project with some development policy and 
tasks automation with [Grunt](http://gruntjs.com/).  Also, this project contains some NPM modules that you have 
to use for managing: date,  logging, configuration, requests, yaml, json and promise. Finally, it has [Travis CI](https://travis-ci.org/) 
integration too.

## How to adapt the template

Before starting to develop your project you must adapt this template by following the next 
steps:

1. Download project-template-nodejs [latest version](#latest-release).
2. [Adapt](#1-adapt-the-package) the `package.json`.
3. [Adapt](#2-adapt-the-bower) the `bower.json`.
4. [Modify](#3-modify-gruntfile) `Grunfile.js` and select the tasks.   
  4.1. Defined Tasks.  
  4.2. Select and configure tasks.
5. [Clear](#3-clear-changelog) CHANGELOG.md.
6. [Remove](#4-remove-git-directory) `.git` directory.
7. [Edit](#5-edit-the-readme) the `README.md`.
8. [CI](#6-ci-with-travis-ci) with Travis CI.
9. [Developing](#7-developing-your-project) your project.  
  9.1. Using [dates](#using-dates).  
  9.2. Project's [configurations](#projects-configurations-variables) variables.  
  9.3. [Logging](#logging).  
  9.4. [Promise](#promise).  
  9.5. [YAML and JSON](#yaml-and-json).  
  9.6. [HTTP requests](#http-requests).  
  9.7. [Make a server](#make-a-server).

## 2. Adapt the package

First, you must adapt the `package.json` file and modify some values for defining your project.
A `package.json` is generally seemed such as the following.

```js
{
  "name": "project-template-nodejs",
  "version": "0.0.0",
  "description": "Project Template for Node JS developments",
  "homepage": "https://github.com/isa-group/project-template-nodejs",
  "main": "index.js",
  "dependencies": {..},
  "devDependencies": {...},
  "scripts": {
    "start": "npm index",
    "test": "grunt test"
  },
  "keywords": [...],
  "author": {
    "name": "ISA group",
    "web": "http://www.isa.us.es/"
  },
  "license": "GPL-3.0+",
  "repository": {
    "type": "git",
    "url": "git://github.com/isa-group/project-template-nodejs.git",
    "github": "http://github.com/isa-group/project-template-nodejs"
  },
  "docker": {
    "url": "https://hub.docker.com/r/darteaga/testing-grunt/"
  }
}
```

You MUST change the following fields:

- **[ MUST ]** `name` = Name of your project. 
- **[ COULD ]** `description` = A breaf description of your proyect.
- **[ MUST ]** `homepage` = Web or Github's homepage of your project.
- **[ SHOULD ]** `keywords` = Key words for idenfiying your project.
- **[ MUST ]** `author.name`= Your name or your organization name.
- **[ MUST ]** `author.web` = Author web site.
- **[ MUST ]** `repository.url` = Location of your repository.
- **[ MUST ]** `repository.web` = Web view of your repository, Github for example.
- **[ MUST ]** `docker.url` = If you use docker for delivering and running your app.

## 3. Adapt the bower

Secondly, you must adapt the `bower.json` file and modify some values for defining your front-end dependencies. A `bower.json` is generally seemed such as the following.

```js
{
  "name": "project-template-nodejs",
  "description": "Project Template for Node JS developments",
  "main": "index.js",
  "authors": [{
    "name": "ISA group",
    "web": "http://www.isa.us.es/"
  }],
  "license": "GPL-3.0+",
  "keywords": [
    "template",
    "nodejs",
    "node",
    "project"
  ],
  "homepage": "https://github.com/isa-group/project-template-nodejs",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "public/bower_components/",
    "test",
    "tests"
  ]
}
```

You MUST change the following fields:

- **[ MUST ]** `name` = Name of your project. 
- **[ COULD ]** `description` = A breaf description of your proyect.
- **[ MUST ]** `homepage` = Web or Github's homepage of your project.
- **[ SHOULD ]** `keywords` = Key words for idenfiying your project.
- **[ MUST ]** `author.name`= Your name or your organization name.
- **[ MUST ]** `author.web` = Author web site.

## 4. Modify Gruntfile

After adapting `package.json`, you must select and configure Grunt tasks. It is recommended 
to use all of the defined tasks, but now it is presented all of them and its use obligation.

### 4.1 Defined Tasks

#### grunt-contrib-jshint 

> You **MUST** use this task.

This task checks whether your code follows correctly the javascript syntax. You are not able 
either to change what file are checked or to change `.jshintrc` file.

#### grunt-contrib-watch

> You **SHOULD** use this task.

This task executes other tasks while you are developing, the jshint task for example. 
You can choose what task are executed if you change something at `Grunfile.js` as following:

```js
watch: {
    scripts: {
        files: ['src/**/*.js'],
        tasks: ['jshint']
    }
}
```

Add to `tasks` field all of the tasks that you want to run it. 

#### grunt-mocha-test

> You **MUST** use this task.

**All your code has to be tested**. This task executes tests. In addition, this task will be used
by Travis CI to check whether your changes pass the tests and can be merged. You don't be able
to configure this task. 

#### grunt-release-github

> You **SHOULD** use this task. (Only if you are release manager).

This task executes steps that you should do for releasing a new version. You must configure 
for using with your project properties. There are two type of projects, `node-application` or 
`npm module`, Depend on the type, you must configure this tasks in different ways.

For use this task you have to set two ENVIRONMENT variables in the shell:

- GITHUB_ACCESS_TOKEN 
  - windows: `set GITHUB_ACCESS_TOKEN=<your-github-accestoken>`
  - linux: `export GITHUB_ACCESS_TOKEN=<your-github-accestoken>`

- GITHUB_USERNAME 
  - windows: `set GITHUB_USERNAME=<your-github-username>`
  - linux: `export GITHUB_USERNAME=<your-github-username>`

If your project is a `node-application`, a server application, an API, or anything that can 
be deployed, you must configure this task as following:

```js
release: {
    options: {
        changelog: true, //NOT CHANGE
        changelogFromGithub: true, //NOT CHANGE
        githubReleaseBody: 'See [CHANGELOG.md](./CHANGELOG.md) for details.', //NOT CHANGE
        npm: false, //CHANGE TO TRUE IF YOUR PROJECT IS A NPM MODULE 
        //npmtag: true, //default: no tag
        updateVars: ['pkg'], //NOT CHANGE
        github: {
            repo: "isa-group/project-template-nodejs", //SET WITH YOUR PROJECT ID
            accessTokenVar: "GITHUB_ACCESS_TOKEN", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            usernameVar: "GITHUB_USERNAME" //SET ENVIRONMENT VARIABLE WITH THIS NAME
        }
    }
}
```

If your project is a `npm module` you must configure this task as following:

```js
release: {
    options: {
        changelog: true, //NOT CHANGE
        changelogFromGithub: true, //NOT CHANGE
        githubReleaseBody: 'See [CHANGELOG.md](./CHANGELOG.md) for details.', //NOT CHANGE
        npm: true, //CHANGE TO TRUE IF YOUR PROJECT IS A NPM MODULE 
        //npmtag: true, //default: no tag
        updateVars: ['pkg'], //NOT CHANGE
        github: {
            repo: "isa-group/project-template-nodejs", //SET WITH YOUR PROJECT ID
            accessTokenVar: "GITHUB_ACCESS_TOKEN", //SET ENVIRONMENT VARIABLE WITH THIS NAME
            usernameVar: "GITHUB_USERNAME" //SET ENVIRONMENT VARIABLE WITH THIS NAME
        }
    }
}
```

#### grunt-banner

> You **MUST** use this task.

This task adds both a license notice to all files and a release note to `README.md`. You don't 
be able to change the configuration of this task.

#### grunt-dockerize 

> If you need to build docker images, you **MUST** use this task. In addition, this task will be 
used by Travis CI for continuous building. You must configure this task as following:

```js
dockerize: {
    'project-template-latest': { //this build for the latest tag
        options: {
            auth: {
                email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME
                username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME
                password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
            },
            name: 'project-template',
            push: true
        }
    },
    'project-template-version': { //this build for de version tag
        options: {
            auth: {
                email: "DOCKER_HUB_EMAIL", //SET ENVIRONMENT VARIABLE WITH THIS NAME
                username: "DOCKER_HUB_USERNAME", //SET ENVIRONMENT VARIABLE WITH THIS NAME
                password: "DOCKER_HUB_PASSWORD" //SET ENVIRONMENT VARIABLE WITH THIS NAME
            },
            name: 'project-template',
            tag: '<%= pkg.version %>',
            push: true
        }
    }
}
```

You must change `..options.name` to the name of your project and set up these environment
variables on command line. 

### 4.1 Select and Configure tasks

For executing default tasks run:

```
grunt 
```

If you want to execute tests task run:

```
grunt test
```

For running build tasks execute:

```
grunt build
```

For releasing a new version:

```
grunt release
```

And you always execute this while you are developing:

```
grunt dev
```
## 5. Clear CHANGELOG

Remove all line on `CHANGELOG.md`.

## 6. Remove git directory

If it exists then remove `.git` and initialize the repository for the new project.

```
git init
```

## 7. Edit the README

Clean the `README.md` and remove all lines except `## Latest release` and following.

## 8. CI with Travis CI

If your new project is public you must integrate Travis CI on project setting. 

## 9. Developing your project

In order to be lined up to Github philosophy, you must use 
[Github Flow](https://guides.github.com/introduction/flow/) that is a lightweight, 
branch-based workflow that supports teams and projects where deployments are regularly
made. This guide explains how and why GitHub Flow works.

> We have only modified one point of this flow, the name of your branch has to be the number of
> the issue that is being resolved. If your issue has the number **4** then your branch has to be
> named **#4**.

Tests are very important in software development, moreover, if GitHub Flow is used, test is even
more important.

Depending on you want to do, you have to use a specific npm modules in order to be standard. All
modules are being installed in the project before. 

### Using dates 

If you manipulate dates and times, you must use the library [Moment JS](http://momentjs.com/).
At follow, it is exposed an example:

```js
var moment = require('moment');

var now = moment().toISOString(); //see library documentation for advance using.
``` 

> You always must use ISO 8601 format. 

### Project's configurations variables

Sometimes, you could need to add external configuration, exposing `port` or the
`environment` where the application will be deploying for example. for doing that:

```js
var config = require('./config');

app.listen(config.port);

``` 

`./src/configurations/myOwnConfig.yaml`: 

```js
production:
  port: 80

development:
  port: 5000
```

In addition, you could use `./src/configurations/config.yaml`, in this case you don't have 
to execute `config.addConfiguration`, it is excecuted by default.

### Logging

If it is necessary to use a logger, you must use the logger which is exported 
on `src/logger/logger.js` as in the example:

```js
var logger = require('./logger/logger');

logger.info('Hello world!');
```

In addition, you can configure the logger and use your own levels. You only have to add levels 
to `src/logger/logger.js`

```js
var customLeves = {
    levels: {
        error: 7,
        warning: 8,
        custom: 9,
        info: 12,
        debug: 13
    },
    colors: {
        error: 'red',
        warning: 'yellow',
        custom: 'magenta',
        info: 'white',
        debug: 'black'
    }
};
```
And then use as in the example:

```js
var logger = require('./logger/logger');

logger.custom('custom level');
```

Also, you can change its configuration on `./src/configurations/config.yaml`:

```js
production:
  loglevel: info
  logfile: '../logs'

development:
  loglevel: debug
  logfile: '../logs'
```

### Promise

If it is necessary to use Promise, you must use 
[Bluebird](http://bluebirdjs.com/docs/getting-started.html) library. Next, you can 
see an example:

```js
var Promise = require('bluebird');

function _myPromiseFunction(param1, param2) {

    return new Promise(function (resolve, reject) {
        if (param1 && param2) {
            resolve(param1 + "-" + param2);
        } else {
            reject(new Error("Params are require"));
        }
    });

}

_myPromiseFunction.then(successCallback, errorCallback);
```

### YAML and JSON

If you have to manipulate whether yaml or json, you must use 
[JS-YAML](https://github.com/nodeca/js-yaml) library. As follow:

```js
var jsyaml = require('js-yaml');

var yamlString = fs.readFileSync(uri, encoding);
var jsObject = jsyaml.safeLoad(configString);
```
### HTTP requests

If you have to do http requests, you must use 
[requests](https://github.com/request/request) library.

### Make a server

If you want to serve your static files or create a REST API, you must use [ExpressJS](http://expressjs.com/es/). 

```js
var express = require('express');

var app = express();

//serving static files
app.use('/', express.static('../public'));

//adding API endpoint
app.get('api/v1/resources', function(req, res, next){});
```
In adition, if you need: 

- To use cors, you should use npm `cors` module.

```js
var cors = require('cors');

app.use(cors(options));
```

- To make your API secure, you should use npm `helmet` module. 

```js
var helmet = require('helmet');

app.use(helmet(options));
```

- To use json data exchanging, you should use npm `body-parser` module.

```js
var bodyParser = require('body-parser');

app.use(bodyParser.json());
```

## Copyright notice

**project-template-nodejs** is open-source software available under the GNU General Public License (GPL) version 3 (GPL v3).

All including documentation and code are copyrighted and the copyright is owned by [ISA Group](http://www.isa.us.es), 
[University of Sevilla](http://www.us.es), unauthorized reproduction or distribution of this copyrighted work is illegal.
For commercial licensing terms, please [contact](./extra/contact.md) for any inquiry.

For technical inquiry please contact to [engineering team](./extra/about.md).

## Latest release

[![Build Status](https://travis-ci.org/isa-group/project-template-nodejs.svg?branch=master)](https://travis-ci.org/http://github.com/isa-group/project-template-nodejs)

The version 0.0.0 is the latest stable version of project-template-nodejs component.
see [release note](http://github.com/isa-group/project-template-nodejs/releases/tag/0.0.0) for details.

For running:

- Download latest version from [0.0.0](http://github.com/isa-group/project-template-nodejs/releases/tag/0.0.0)

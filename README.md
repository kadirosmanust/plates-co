
# Plates Co
## Table of Contents
  1. [Quick Start](#quick-start)
  1. [Built With](#built-with)
  1. [Directory Structure](#directory-structure)
  1. [Glossary](#glossary)
## Quick Start

- Clone repo
```bash
    # clone the repo
    $ git clone git@github.com:kadirosmanust/plates-co.git

    # go into app directory
    $ cd plates-co
```

- Package installation
```bash
    # install app dependencies with npm
    $ npm install
```
- Husky setup
```bash
    $ npm run prepare 
```
#### Usage
- Start
```bash
    # start application with hot reload at http://localhost:9003/
      # Please use Nodejs v20.15.0
    $ npm start
```
#### Build
- Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
    # build for production with minification
    $ npm build
```
#### Coverage
- Run `test-coverage` to test the project. The coverage artifacts will be stored in the `coverage/` directory.

```bash
    $ npm run test-coverage
```
![test-coverage](https://raw.githubusercontent.com/kadirosmanust/plates-co/master/internals/coverage.png)
## Built With
- Webpack
- Babel

## Directory Structure
```
Plates Co
├── src/                #project root
│   ├── components/
│   ├── constants/
│   ├── logic/
│   ├── utils/
│   ├── index.css
│   ├── index.js
│   ├── store.js
│   ├── reducers.js
│   ├── pubsub.js
├── public/
├── internals/  
├── tests/                
│
└── package.json
```
## Glossary
- `.eslintrc.cjs`: Sets the default lint rules for quality of codebase.

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `package.json`: Sets project's package dependencies and scripts etc. for managing project environment

- `.prettierrc`: Sets the default standarts for making your codebase beautiful
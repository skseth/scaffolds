# Typescript-Node-Lib Generator

## Files in this repository

The structure of this repo is as follows:

#### Source Code Folders
```
/src                     Source for this library
  /tsconfig.json           Config file for 'src' project
  /hello.ts                Submodule that exposes hello_world function
  /index.ts                reexports hello world
/test                    Depends on 'src'
  /tsconfig.json           Config file for 'test' project
  /hello.spec.ts           Tests for hello.ts
/tsconfig-node-lib.json  Shared configuration file for common compiler options
```

#### Build and Build Configuration
```
/build                   Files used for build
  /.npmignore              Used for ignoring files during packaging
  /SetupPackage.js         SetupPackage which packages, if needed for publishing
/dist                    Output folder (not checked in)
```

#### ESLint, Prettier & VSCode configuration
```
/.eslintignore           Output folder (not checked in)
/.eslintrc               Config for eslint with prettier, typescript 
/.prettierrc             Config file for prettier 
/.editorconfig           Indentation, tabs, spacing and line endings
/.vscode                 Visual Studio Code settings
  /settings.json         ESLint formatting configs for VS Code (uses dbaeumer.vscode-eslint extension)
```
#### Standard Files
```
/README.md               This file
/.gitignore              For excluding build outputs and node_modules
/package.json            NPM package definition file
/package-lock.json       NPM package lock file - not copied during scaffolding
/node_modules            NPM modules
```
#### Scaffolding Files
```
/scaffold.toml          Config file for scaffolding - not copied during scaffolding
/scaffold               Yeoman based scaffold generator - please see folder for details
```

## Use of tsconfig.json

This project uses the "composite" project setting of typescript with project references. 
With this setting, we can break up our source into separate projects (e.g. by functionality, or source vs test code),
and express dependencies between each other. Key settings are :

#### tsconfig-node-lib.json
```json
{
  "compilerOptions": {
    // see : https://www.typescriptlang.org/docs/handbook/project-references.html
    "composite": true,
    // ... other settings
  }
}
```
### src/tsconfig.json

```json
{
  // inherits settings from tsconfig-node-lib, where composite is true
  "extends": "../tsconfig-node-lib",
  "compilerOptions": {
    // only include sources in src/** for compilation
    "rootDir": ".",
    // generate output in dist folder
    "outDir": "../dist"
  }
}
```

### test/tsconfig.json

```json
{
  // ... other settings
  "references": [
    {
      // allow references to files in src folder, but use src folders' tsconfig.json while building
      // automatically build src folder if needed
      "path": "../src"
    }
  ]
}
```

## Multi-Project Setup

The scaffolding allows deployment of the solution in a multi-project setup

A multi-project setup would involve some changes to the structure :

#### Overall Multi-project Structure

```
/toplevel                    Source for this library
  /tsconfig.json               Config file for 'all' projects (not created by the per-project scaffolding)
  /out                       Common Output folder (may be needed for some projects)
  /config                      tsconfig-xx files
    /tsconfig-node-lib.json      Shared configuration file for common compiler options for node projects
    /tsconfig-others..           Other Shared config files e.g. react
  /project1                  Project 1 directory

// All the ESLint, Prettier and VSCode files and folders

```

#### Individual Project Structure



#### Build and Build Configuration
```
/build                   Files used for build
  /.npmignore              Used for ignoring files during packaging
  /SetupPackage.js         SetupPackage which packages, if needed for publishing
/dist                    Output folder (not checked in)
```

#### ESLint, Prettier & VSCode configuration
```
/.eslintignore           Output folder (not checked in)
/.eslintrc               Config for eslint with prettier, typescript 
/.prettierrc             Config file for prettier 
/.editorconfig           Indentation, tabs, spacing and line endings
/.vscode                 Visual Studio Code settings
  /settings.json         ESLint formatting configs for VS Code (uses dbaeumer.vscode-eslint extension)
```
#### Standard Files
```
/README.md               This file
/.gitignore              For excluding build outputs and node_modules
/package.json            NPM package definition file
/package-lock.json       NPM package lock file - not copied during scaffolding
/node_modules            NPM modules
```
#### Scaffolding Files
```
/scaffold.toml          Config file for scaffolding - not copied during scaffolding
/scaffold               Yeoman based scaffold generator - please see folder for details
```




## References

[Project References Demo](https://github.com/RyanCavanaugh/project-references-demo/)
# Spacecraft

## Table of contents

- [Import components](#import-components)
- [Theme](#theme)
- [Styles & scripts](#styles--scripts)
- [Production task](#production-task)
- [Override templates](#override-templates)

## Assets

Default settings:
```
  "assets": {
    "assetTasks": ["fonts", "icons", "images"],
    "codeTasks": ["css", "js"],
    "dest": "assets"
  },
```

## Fractal or proxy

Default setting is fractal.

### Proxy
Example configuration with proxy server
```
  "proxy":{
    "browserSyncConfig": {
      "proxy": "http://127.0.0.1:8000/"
    }
  },
```

### Without fractal or proxy
Change to the following setting to run gulp with fractal or proxy.
```
  "proxy":{},
```

## Import components

### Import task

The import-task trigger multiple tasks to handle the various
destinations for different files that make up a component.

#### Install components
To add a component to your project, first *install* it and then run the 
*import-task* to get the files into the project as follows:

``npm install --save <componentname>``

``gulp import --component <componentname>``

#### Component config
To get the styles in sync, remember to import the component styles
in this file ``./src/scss/components/_components.main.scss`` like this
``@import "views/<component>/<component>";``

#### Disable import task
To remove the import functionality from Spacecraft, open
``./gulpfile.js/utils/extendTasks.js`` and delete the following
code:

```
// Import tasks
requireDir('../import', { recurse: true })
```

Then delete this folder ``./gulpfile.js/import`` and also remove the 
``import: { ... }`` part from ``config.json`` in the root of the 
Spacecraft Starterkit.

## Theme

Config the template settings with the following variable:
```
"themeSettings": {
  "skin": "black"
}
```

### Styles & scripts

Further information is available here:
http://fractal.build/guide/web/default-theme#configuration

Add the ```theme``` settings if you want to sync a theme folder into the build folder.

```
"theme": {
  "src": "_fractal",
  "dest": "_fractal",
  "override": false
},
```

### Production task

*Available from v. 0.1.14*

Use `gulp production` to copy files from the spacecraft project to another destination

Add the `production` settings to choose which tasks to run, the order to run and which folders to sync. The paths to buildfolder and destinationfolder must also be added.

Example code to add in config.json in the project.
```
"production" : {
    "rev": true,
    "assetTasks": ["fonts", "icons", "images"],
    "codeTasks": ["css", "js"],
    "folders": ["css", "js", "icons", "fonts", "img"],
    "path":{
      "src": "<spacecraft project build folder>",
      "dest": "<external project target folder>"     
    }
  }, 
```

### Override templates

Override templates by specifying a override folder.

Further information is available here:
http://fractal.build/guide/web/default-theme#template-customisation
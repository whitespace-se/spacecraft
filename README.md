# Spacecraft

## Table of contents

- [Theme](#theme)

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

Use ```gulp production``` to copy files from the spacecraft project to another destination

Add the ```production``` settings to choose which tasks to run, the order to run and which folders to sync. The paths to buildfolder and destinationfolder must also be added.

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
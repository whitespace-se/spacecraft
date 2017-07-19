#	Tasks to import components

The import-task trigger these multiple tasks to handle the various
destinations for different files that make up a component.

## Install component
To add a component to your project, first *install* it and then run the 
*import-task* to get the files into the project as follows:

``npm install --save <componentname>``

``gulp import --component <componentname>``

## Config
To get the styles in sync, remember to import the component styles
in this file ``./src/scss/components/_components.main.scss`` like this
``@import "views/<component>/<component>";``

## Disable
To remove the import functionality from Spacecraft, open
``./gulpfile.js/utils/extendTasks.js`` and delete the following
code:

```
// Import tasks
requireDir('../import', { recurse: true })
```

Then delete this folder (``./gulpfile.js/import``) and also remove the 
``import: { ... }`` part from ``config.json`` in the root of the 
Spacecraft Starterkit.
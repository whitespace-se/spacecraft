const config = require('../../config')
const gulp   = require('gulp')
const path   = require('path')
const watch  = require('gulp-watch')
const getEnabledTasks = require('../lib/getEnabledTasks')

const watchTask = function() {
  const tasks = getEnabledTasks('watch')

  tasks.codeTasks.forEach(function(taskName) {
    const task = config.tasks[taskName]
    if(task) {
      if(task.src instanceof Array){
        task.src.forEach(function(src) {
          const glob = path.join(src, '**/*.{' + task.extensions.join(',') + '}')
          watch(glob, function() {
           require('./' + taskName)()
          })
        })
      }
      else{
        const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
        watch(glob, function() {
         require('./' + taskName)()
        })
      }
    }
  })

  tasks.assetTasks.forEach(function(taskName) {
    const task = config.tasks[taskName]
    if(task) {
      const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      watch(glob, function() {
       require('./' + taskName)()
      })
    }
  })
}

gulp.task('watch', watchTask)
module.exports = watchTask

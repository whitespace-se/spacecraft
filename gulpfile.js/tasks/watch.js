const config = require('../../config')
const gulp   = require('gulp')
const path   = require('path')
const watch  = require('gulp-watch')

const watchTask = function() {
  const watchableTasks = ['css']

  watchableTasks.forEach(function(taskName) {
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

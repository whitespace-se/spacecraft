const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')

const projectTask = function(cb) {
  const tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', cb)
}

gulp.task('project', projectTask)
module.exports = projectTask

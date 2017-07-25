const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')

const defaultTask = function(cb) {
  const tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', 'fractalStart', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask

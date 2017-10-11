const config          = require('../../config')
const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')

const productionTask = function(cb) {
  global.production = true
  const tasks = getEnabledTasks('styleguide')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'fractalBuild', cb)
}

gulp.task('styleguide', productionTask)
module.exports = productionTask

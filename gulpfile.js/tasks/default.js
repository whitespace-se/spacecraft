const config          = require('../../config')
const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')

const defaultTask = function(cb) {
  const tasks = getEnabledTasks('watch')

  // If type not set - run fractal
  let type;
  if(!config.type){
    type = 'fractalStart'
  }
  else{
    type = config.type
  }

  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', type, cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask

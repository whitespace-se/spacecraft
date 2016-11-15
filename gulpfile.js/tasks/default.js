var gulp            = require('gulp')
var gulpSequence    = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var defaultTask = function(cb) {
  var tasks = getEnabledTasks('watch')
  gulpSequence('clean', 'css', cb)
}

gulp.task('default', defaultTask)
module.exports = defaultTask

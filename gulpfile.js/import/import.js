const path         = require('path')
const gulp         = require('gulp')
const gulpSequence = require('gulp-sequence')

const importTask = function(cb) {
  gulpSequence('importView', 'importJavascript', 'importImages', 'importIcons', 'importDocumentation', cb)
}

gulp.task('import', importTask)
module.exports = importTask
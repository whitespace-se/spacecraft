const path         = require('path')
const gulp         = require('gulp')
const gulpSequence = require('gulp-sequence')

const importTask = function(cb) {
  gulpSequence('importView', 'importJs', 'importImg', 'importIcons', 'importDocs', cb)
}

gulp.task('import', importTask)
module.exports = importTask
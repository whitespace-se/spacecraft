const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv = require('yargs').argv
if(argv._ != 'import') return

const component = require(argv.component)

const importDocsTask = function() {
  return gulp.src(path.join(component, config.import.docs.src, '/**/*.{' + config.import.docs.extensions + '}'))
    .pipe(gulp.dest(config.import.docs.dest))
}

gulp.task('importDocs', importDocsTask)
module.exports = importDocsTask
const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv = require('yargs').argv
if(argv._ != 'import') return

const component = require(argv.component)

const importDocumentationTask = function() {
  return gulp.src(path.join(component, config.import.documentation.src, '/**/*.{' + config.import.documentation.extensions + '}'))
    .pipe(gulp.dest(config.import.documentation.dest))
}

gulp.task('importDocumentation', importDocumentationTask)
module.exports = importDocumentationTask
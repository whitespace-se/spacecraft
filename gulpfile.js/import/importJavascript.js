const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv  = require('yargs').argv
if(argv._ != 'import') return

const component = require(argv.component)

const importJavscriptTask = function() {
  return gulp.src(path.join(component, config.import.javascript.src, '/**/*.{' + config.import.javascript.extensions + '}'))
    .pipe(gulp.dest(path.join(config.root.src, config.import.javascript.dest)))
}

gulp.task('importJavscript', importJavscriptTask)
module.exports = importJavscriptTask




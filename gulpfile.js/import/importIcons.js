const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv = require('yargs').argv
if(argv._ != 'import') return

const component = require(argv.component)

const importIconsTask = function() {
  return gulp.src(path.join(component, config.import.icons.src, '/**/*.{' + config.import.icons.extensions + '}'))
    .pipe(gulp.dest(path.join(config.root.src, config.import.icons.dest)))
}

gulp.task('importIcons', importIconsTask)
module.exports = importIconsTask
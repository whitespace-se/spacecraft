const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv = require('yargs').argv
if(argv._ != 'import') return

const component     = require(argv.component)

const importImagesTask = function() {
  return gulp.src(path.join(component, config.import.images.src, '/**/*.{' + config.import.images.extensions + '}'))
    .pipe(gulp.dest(path.join(config.root.src, config.import.images.dest)))
}

gulp.task('importImages', importImagesTask)
module.exports = importImagesTask
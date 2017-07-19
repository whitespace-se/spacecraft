const config = require('../../config')
if(!config.import) return

const path = require('path')
const gulp = require('gulp')
const argv = require('yargs').argv
if(argv._ != 'import') return

const component     = require(argv.component)

const importImgTask = function() {
  return gulp.src(path.join(component, config.import.img.src, '/**/*.{' + config.import.img.extensions + '}'))
    .pipe(gulp.dest(path.join(config.root.src, config.import.img.dest)))
}

gulp.task('importImg', importImgTask)
module.exports = importImgTask
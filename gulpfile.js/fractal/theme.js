const config       = require('../../config')
if(!config.fractal.theme) return

const gulp         = require('gulp')
const path         = require('path')

const paths = {
  src: path.join(config.fractal.theme.src, '/**/*.*'),
  dest: path.join(config.root.dest, config.fractal.theme.dest)
}

const fractalTheme = function () {
  console.log(paths)
  return gulp.src(paths.src)
    .pipe(gulp.dest(paths.dest))
}

gulp.task('fractalTheme', fractalTheme)
module.exports = fractalTheme

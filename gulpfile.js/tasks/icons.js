const config = require('../../config')

const gulp      = require('gulp')
const svgSprite = require('gulp-svg-sprite')
const path      = require('path')

const paths = {
  src: path.join(config.root.src, config.tasks.icons.src, '/**/*.svg'),
  dest: path.join(config.root.dest, config.tasks.icons.dest)
}

const iconsTask = function (cb) {
  return gulp.src(paths.src)
  .pipe(svgSprite(config.tasks.icons.config))
  .pipe(gulp.dest(paths.dest));
}

gulp.task('icons', iconsTask)
module.exports = iconsTask

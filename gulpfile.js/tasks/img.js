const config      = require('../../config')
if(!config.tasks.images) return

const changed     = require('gulp-changed')
const gulp        = require('gulp')
const imagemin    = require('gulp-imagemin')
const path        = require('path')

const paths = {
  src: path.join(config.root.src, config.tasks.images.src, '/**/*.{' + config.tasks.images.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.images.dest)
}

const imagesTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(paths.dest))
}

gulp.task('images', imagesTask)
module.exports = imagesTask

const config       = require('../../config')
if(!config.tasks.css) return

const gulp         = require('gulp')
const gulpif       = require('gulp-if')
const sass         = require('gulp-sass')
const sourcemaps   = require('gulp-sourcemaps')
const handleErrors = require('../lib/handleErrors')
const autoprefixer = require('gulp-autoprefixer')
const path         = require('path')
const cssnano      = require('gulp-cssnano')
const combineMq    = require('gulp-combine-mq');

const paths = {
  src: path.join(config.root.path, config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
  dest: path.join(config.root.path, config.root.dest, config.tasks.css.dest)
}

const cssTask = function () {
  return gulp.src(paths.src)
    .pipe(gulpif(!global.production, sourcemaps.init()))
    .pipe(sass(config.tasks.css.sass))
    .on('error', handleErrors)
    .pipe(combineMq({beautify: false}))
    .pipe(autoprefixer(config.tasks.css.autoprefixer))
    .pipe(gulpif(global.production, cssnano({autoprefixer: false})))
    .pipe(gulpif(!global.production, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('css', cssTask)
module.exports = cssTask

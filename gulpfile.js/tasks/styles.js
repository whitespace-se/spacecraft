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
const argv         = require('yargs').argv

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const paths = {
  src: [],
  dest: path.join(config.root.dest, config.tasks.css.dest)
}

if(config.tasks.css.src instanceof Array){
  config.tasks.css.src.forEach(function(src) {
    paths.src.push(path.join(src, '/**/*.{' + config.tasks.css.extensions + '}'))
  })
}
else{
  paths.src = path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}')
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

gulp.task('styles', cssTask)
module.exports = cssTask

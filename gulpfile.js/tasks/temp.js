const config      = require('../../config')
if(!config.tasks.temp) return

const changed     = require('gulp-changed')
const gulp        = require('gulp')
const path        = require('path')
const argv        = require('yargs').argv

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const paths = {
  src: path.join(config.root.src, config.tasks.temp.src, '/**/*.*'),
  dest: path.join(config.root.dest, config.tasks.temp.dest)
}

const tempTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
}

gulp.task('temp', tempTask)
module.exports = tempTask

const config      = require('../../config')
if(!config.tasks.fonts) return

const changed     = require('gulp-changed')
const gulp        = require('gulp')
const path        = require('path')
const argv        = require('yargs').argv

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const paths = {
  src: path.join(config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest)
}

const fontsTask = function() {
  return gulp.src([paths.src, '*!README.md'])
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask

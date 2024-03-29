const config          = require('../../config')
const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const del             = require('del')
const path            = require('path')
const argv            = require('yargs').argv

if(!config.assets.assetTasks || !config.assets.codeTasks || !config.assets.dest) return

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const assetsTask = function(cb) {
  global.production = true

  const buildPath = config.root.dest
  const destPath = config.assets.dest

  // 1. Remove production folder
  del([destPath], {
    force: true
  });

  // 2. Remove build folder, generate asset files & copy them to the production folder
  gulpSequence(
    'clean',
    config.assets.assetTasks,
    config.assets.codeTasks,
    function(){
      gulp.src(path.join(buildPath,'/**'))
        .pipe(gulp.dest(destPath)),
    cb
    }
  );
}

gulp.task('production', assetsTask)
module.exports = assetsTask

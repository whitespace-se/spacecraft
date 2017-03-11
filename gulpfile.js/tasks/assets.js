const config          = require('../../config')
const gulp            = require('gulp')
const gulpSequence    = require('gulp-sequence')
const del             = require('del')
const path            = require('path')

if(!config.assets.assetTasks || !config.assets.codeTasks || !config.assets.dest) return

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

gulp.task('assets', assetsTask)
module.exports = assetsTask

const config       = require('../../config')
const gulp         = require('gulp')
const gulpSequence = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')
const del          = require('del')
const path         = require('path')

const productionTask = function(cb) {
  global.production = true

  if(config.production.tasks){
    const buildPath = config.root.dest;
    const destPath = config.production.path.dest ? config.production.path.dest : config.root.production;

    gulpSequence(function(){
      del([destPath], {
        force: true
      });
    }, config.production.tasks, function(){
      if(config.production.folders){
        config.production.folders.forEach(function(folderName) {
          gulp.src(path.join(buildPath, folderName,'/**'))
            .pipe(gulp.dest(path.join(destPath, folderName)));
          console.log('Moving ' + path.join(buildPath, folderName) + ' to ' + path.join(destPath, folderName));
        })
      }
      else{
          gulp.src(path.join(buildPath,'/**'))
            .pipe(gulp.dest(destPath));
      }

    });
  }
  else{
    const tasks = getEnabledTasks('production')
    gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'fractalBuild', cb)
  }
}

gulp.task('production', productionTask)
module.exports = productionTask

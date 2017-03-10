const config       = require('../../config')
const gulp         = require('gulp')
const gulpSequence = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')
const del          = require('del')
const path         = require('path')

const productionTask = function(cb) {
  global.production = true

  if(config.production.assetTasks && config.production.codeTasks){
    const buildPath = config.root.dest;
    const destPath = config.production.path.dest ? config.production.path.dest : config.root.production;

    gulpSequence(
    'cleanproduction'
    , config.production.assetTasks
    , config.production.codeTasks
    ,function(){
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
gulp.task('cleanproduction', function(){
  const destPath = config.production.path.dest ? config.production.path.dest : config.root.production;
  del([destPath], {
    force: true
  });
})
gulp.task('production', productionTask)
module.exports = productionTask

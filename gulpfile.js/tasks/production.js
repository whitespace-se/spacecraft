const config       = require('../../config')
const gulp         = require('gulp')
const gulpSequence = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')
const path = require('path')

const productionTask = function(cb) {
  global.production = true

  if(typeof config.production.tasks != 'undefined'){
  	gulpSequence(config.production.tasks, function(){
	  	var buildPath = config.production.path.src ? config.production.path.src : config.root.path;
	  	var destPath = config.production.path.dest ? config.production.path.dest : config.root.production;
		
		if(config.production.folders){
			var folderName;
			for(var i = 0; i < config.production.folders.length; i++){
				folderName = config.production.folders[i];
				gulp.src(path.join(buildPath, folderName,"/*"))
					.pipe(gulp.dest(path.join(destPath, folderName)));
				console.log("Moving " + path.join(buildPath, folderName) + " to " + path.join(destPath, folderName));
			}
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

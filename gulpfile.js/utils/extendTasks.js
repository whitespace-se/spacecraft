const requireDir = require('require-dir')
const argv = require('yargs').argv

module.exports = function extendTasks(gulp, tasks) {
  const defaultTasks = requireDir('../tasks', { recurse: true })

  if(argv._ == 'import') {
    let importTasks = requireDir('../import', { recurse: true })
    tasks = Object.assign({}, tasks, importTasks);
  }

  tasks = Object.assign({}, defaultTasks, tasks);

  Object.keys(tasks).forEach(function(taskName) {
    // Build argument array with task name and other params
    let args = [taskName].concat(tasks[taskName]);

    // Apply the arguments on gulp.task
    gulp.task.apply(gulp, args);
  });

  // Fractal
  requireDir('../fractal', { recurse: true })
}

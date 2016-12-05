const requireDir = require('require-dir')

module.exports = function extendTasks(gulp, tasks) {
  const defaultTasks = requireDir('../tasks', { recurse: true })
  var tasks = Object.assign({}, defaultTasks, tasks);

  Object.keys(tasks).forEach(function(taskName) {
    // Build argument array with task name and other params
    var args = [taskName].concat(tasks[taskName]);

    // Apply the arguments on gulp.task
    gulp.task.apply(gulp, args);
  });

  // Fractal
  requireDir('../fractal', { recurse: true })
}

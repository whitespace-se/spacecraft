const gulp            = require('gulp')
const fractal         = require('../../fractal.js');
const logger          = fractal.cli.console;

const fractalBuild = function () {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
      logger.success('Fractal build completed!');
  });
}

gulp.task('fractalBuild', fractalBuild)
module.exports = fractalBuild

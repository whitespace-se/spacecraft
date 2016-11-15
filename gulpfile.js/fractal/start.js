const gulp            = require('gulp')
const fractal         = require('../../fractal.js');
const logger          = fractal.cli.console;

const fractalStart = function () {
  const server = fractal.web.server({
      sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
      logger.success(`Fractal server is now running at ${server.urls.sync.local}`);
  });
}

gulp.task('fractalStart', fractalStart)
module.exports = fractalStart

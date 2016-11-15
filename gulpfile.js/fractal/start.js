const gulp            = require('gulp')
const fractal         = require('../../fractal.js');
const logger          = fractal.cli.console;

const fractalStart = function () {
  const server = fractal.web.server({
      sync: true
  });

  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
      logger.success(`Local URL:      ${server.urls.sync.local}`);
      logger.success(`Network URL:    ${server.urls.sync.external}`);
      logger.success(`BrowserSync UI: ${server.urls.sync.ui}`);
  });
}

gulp.task('fractalStart', fractalStart)
module.exports = fractalStart

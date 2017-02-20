'use strict';
var config  = require('./config')

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const customisedTheme = mandelbrot(config.fractal.themeSettings);
fractal.web.theme(customisedTheme);

/*
 * Template engine
 */
if(config.fractal.templateEngine == 'nunjucks'){
  // Nunjucks
  const nunjucksAdapter = require('@frctl/nunjucks')(config.fractal.templateSettings);
  fractal.components.engine(nunjucksAdapter);

}
else {
  // Twig
  const twigAdapter = require('spacecraft-twig')(config.fractal.templateSettings);
  fractal.components.engine(twigAdapter);
}

fractal.components.set('ext', config.fractal.templateExtension);

/*
 * Give your project a title.
 */
fractal.set('project.title', config.fractal.project.title);

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', path.join(__dirname, config.root.path, config.fractal.path.components));
fractal.components.set('default.preview', '@master');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', path.join(__dirname, config.root.path, config.fractal.path.docs));

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', path.join(__dirname, config.root.path, config.fractal.path.static));

/*
 * Build destination
 */
fractal.web.set('builder.dest', path.join(__dirname, config.root.path, config.root.production));

/*
 * Sync options
 */
fractal.web.set('server.syncOptions', config.fractal.syncOptions);

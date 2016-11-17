'use strict';
const config  = require('./config')

/*
* Require the path module
*/
const path = require('path');

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();

/*
 * Twig
 */
const twigAdapter = require('@frctl/twig');
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/*
 * Project title
 */
fractal.set('project.title', config.fractal.project.title);

/*
 * Components
 */
fractal.components.set('path', path.join(__dirname, config.fractal.path.components));
fractal.components.set('default.preview', '@preview');

/*
 * Documentation
 */
fractal.docs.set('path', path.join(__dirname, config.fractal.path.docs));

/*
 * Theme
 */
const mandelbrot = require('@frctl/mandelbrot');

const theme = mandelbrot({
    skin: 'black',
    nav: ['docs', 'components']
});
fractal.web.theme(theme);

/*
 * Sync options
 * - open: open up fractal in browser
 * - browser: default browser - google chrome, followed by firefox
 * - notify: turn on notifications
 *
 */
fractal.web.set('server.syncOptions', {
    open: true,
    browser: ['google chrome', 'firefox'],
    notify: true
});

/*
 * Static assets
 */
fractal.web.set('static.path', path.join(__dirname, config.fractal.path.static));

/*
 * Build destination
 */
fractal.web.set('builder.dest', path.join(__dirname, config.fractal.path.export));

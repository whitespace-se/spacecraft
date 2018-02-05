const config         = require('../../config')
if(!config.tasks.javascript) return

const gulp           = require('gulp')
const parcel         = require('gulp-parcel')
const path           = require('path')
const argv           = require('yargs').argv

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

if (!config.tasks.javascript.entries) {
    console.log('Please define an object or array in the task javascript called "entries" with the files you want as entrypoints');
}
let entries = Array.isArray(config.tasks.javascript.entries)
    ? config.tasks.javascript.entries
    : Object.values(config.tasks.javascript.entries);
entries = [].concat.apply([], entries); // Flatten array of arrays (if exist)

const paths = {
  src: entries.map((entry) => (
    path.join(config.root.src, config.tasks.javascript.src, entry)
  )),
  dest: path.join(config.root.dest, config.tasks.javascript.dest)
}
const javascriptTask = function () {
    const parcelConfig = {
        watch: false,
        minify: global.production,
        hmr: global.production,
        cache: true,
    };
  return gulp.src(paths.src, { read: false })
    .pipe(parcel(parcelConfig))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('javascript', javascriptTask)
module.exports = javascriptTask

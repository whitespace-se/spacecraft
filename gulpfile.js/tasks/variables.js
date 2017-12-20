const config = require('../../config')
if (!config.tasks.variables) return

const gulp = require('gulp')
const gulpUtil = require('gulp-util')
const gulpSequence = require('gulp-sequence')
const path = require('path')
const Verbose = require('./Verbose')
const Crawl = require('./Crawler')
const Transform = require('./Transform')
const formatJson = require('format-json-pretty')

const paths = {
  src: [],
  dest: config.tasks.variables.dest
}

const styles = [];

if (config.tasks.variables.src instanceof Array) {
  config.tasks.variables.src.forEach(function(src) {
    paths.src.push(path.join(src, '/**/*.{' + config.tasks.variables.extensions + '}'))
  })
} else {
  paths.src = path.join(config.root.src, config.tasks.variables.src, '/**/*.{' + config.tasks.variables.extensions + '}')
}

crawl = function(es) {
  return es.map(function(file, cb) {
    //    console.log(file.path);
    let style = Crawler.processFile(file.path);
    styles = styles.concat(style);
    return cb();
  });
};

generate = function(es) {
  let styleguides = Transform.forView(styles);

  var jsonObject = {
    "context": styleguides
  };
  formatJson(jsonObject)
};

const variables = function() {

  gulp.src(paths.src)
    .pipe(gulpUtil.buffer(function(err, files) {
      console.log(files[0].path);
    }));
    /*gulpSequence(
    gulp.src(paths.src)
    .pipe(crawl(es)),
    generate(styles)
);*/

}

gulp.task('variables', variables)
module.exports = variables

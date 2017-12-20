const gulp       = require('gulp')
const Verbose    = require('./Verbose');
const Crawl      = require('./Crawler');
const Transform  = require('./Transform');
const formatJson = require('format-json-pretty');
const fs         = require('fs');


const generateVariables = function () {

  const paths = {
    src: [],
    dest: path.join(config.root.dest, config.tasks.variables.dest)
  }

  if(config.tasks.variables.src instanceof Array){
    config.tasks.variables.src.forEach(function(src) {
      paths.src.push(path.join(src, '/**/*.{' + config.tasks.variables.extensions + '}'))
    })
  }
  else{
    paths.src = path.join(config.root.src, config.tasks.variables.src, '/**/*.{' + config.tasks.variables.extensions + '}')
  }

console.log(paths);

/*
  var files = [
    '../assets/styles/settings/_settings.colors.scss',
    '../assets/styles/settings/_settings.typography.scss',
   ];

  var styles = [];
  for(var f in files) {
    var file = files[f];
    Verbose.spin('Crawling ' + file);
    var style = Crawler.processFile(file);
    styles = styles.concat(style);
  }


  var styleguides = Transform.forView(styles);

  var jsonObject = {
    "context": styleguides
  };

  //console.log(stringifyObject(styleguides));
  fs.writeFileSync('../components/colors/colors.config.json', formatJson(jsonObject));
  fs.writeFileSync('../components/typography/typography.config.json', formatJson(jsonObject));
  Verbose.finished();*/
}

gulp.task('generateVariables', generateVariables)
module.exports = generateVariables

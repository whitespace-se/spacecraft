const gulp   = require('gulp')
const del    = require('del')
const config = require('../../config')
const argv   = require('yargs').argv
const argv   = require('yargs').argv

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const cleanTask = function (cb) {
  del([config.root.dest], {
    force: true
  }).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask

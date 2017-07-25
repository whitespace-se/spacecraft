const gulp   = require('gulp')
const del    = require('del')
const config = require('../../config')

// Change root destination for proxy
if(config.proxy.dest){
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

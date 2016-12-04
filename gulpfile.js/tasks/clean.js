const gulp   = require('gulp')
const del    = require('del')
const config = require('../../config')
const path   = require('path')

const cleanTask = function (cb) {
  del([path.join(config.root.path, config.root.dest)], {"force": true}).then(function (paths) {
    cb()
  })
}

gulp.task('clean', cleanTask)
module.exports = cleanTask

const config          = require('../../config')
const gulp            = require('gulp')
const browserSync     = require('browser-sync')
const watch           = require('gulp-watch')
const path            = require('path')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')

const proxyTask = function(cb) {
  // Run if browserSyncConfig is set
  if(!config.proxy || !config.proxy.browserSyncConfig) {
    console.log('Proxy config is not set')
    return
  }

  const tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', cb)

  let bs = browserSync.init(config.proxy.browserSyncConfig)

  let css = path.join(config.root.dest, config.tasks.css.dest, '/**/*.css')
  gulp.watch(css, function() {
    gulp.src(css)
      .pipe(bs.stream())
  })

  let js = path.join(config.root.dest, config.tasks.js.dest, '/**/*.js')
  gulp.watch(js, function() {
    bs.reload()
  })
}

gulp.task('proxy', proxyTask)
module.exports = proxyTask

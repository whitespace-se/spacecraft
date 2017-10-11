const config          = require('../../config')
const gulp            = require('gulp')
const browserSync     = require('browser-sync')
const watch           = require('gulp-watch')
const path            = require('path')
const gulpSequence    = require('gulp-sequence')
const getEnabledTasks = require('../lib/getEnabledTasks')
const argv            = require('yargs').argv

if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const proxyTask = function(cb) {
  // Run if browserSyncConfig is set
  if(!config.proxy || !config.proxy.browserSyncConfig) {
    console.log('Proxy config is not set')
    return
  }

  const tasks = getEnabledTasks('watch')
  gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'watch', cb)

  let bs = browserSync.init(config.proxy.browserSyncConfig)

  let styles = path.join(config.root.dest, config.tasks.styles.dest, '/**/*.css')
  gulp.watch(styles, function() {
    gulp.src(styles)
      .pipe(bs.stream())
  })

  let javascript = path.join(config.root.dest, config.tasks.javascript.dest, '/**/*.js')
  gulp.watch(javascript, function() {
    bs.reload()
  })
}

gulp.task('proxy', proxyTask)
module.exports = proxyTask

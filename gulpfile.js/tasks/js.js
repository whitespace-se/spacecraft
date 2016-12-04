const config         = require('../../config')
if(!config.tasks.js) return

const gulp           = require('gulp')
const path           = require('path')
const webpack        = require('gulp-webpack')
const webpackConfig = {
  watch: false,
  output: {
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        query: {
          presets: [
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-stage-1'),
          ]
        }
      }
    ]
  }
}

const paths = {
  src: path.join(config.root.src, config.tasks.js.src, '/**/*.{' + config.tasks.js.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.js.dest)
}

const jsTask = function () {
  return gulp.src(paths.src)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('js', jsTask)
module.exports = jsTask

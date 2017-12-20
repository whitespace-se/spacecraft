const config         = require('../../config')
const webpackAppConfig = require('../../webpack')
if(!config.tasks.javascript) return

const gulp           = require('gulp')
const path           = require('path')
const webpack        = require('webpack')
const webpackStream  = require('webpack-stream')
const argv           = require('yargs').argv
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// Change root destination for proxy
if(argv._ == 'proxy' && config.proxy && config.proxy.dest){
  config.root.dest = config.proxy.dest
}

const webpackConfig = {
  watch: false,
  output: {
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.js', '.json', ...webpackAppConfig.resolve.extensions],
    alias: {
        ...webpackAppConfig.resolve.alias
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-env'),
          ]
        }
      },
      ...webpackAppConfig.module.rules,
    ]
  }
}

const paths = {
  src: path.join(config.root.src, config.tasks.javascript.src, '/**/*.{' + config.tasks.javascript.extensions + '}'),
  dest: path.join(config.root.dest, config.tasks.javascript.dest)
}

const javascriptTask = function () {
  if(global.production){
    webpackConfig.plugins = [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('"production"')
        }
      }),
      new UglifyJSPlugin()
    ]
  }

  return gulp.src(paths.src)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('javascript', javascriptTask)
module.exports = javascriptTask

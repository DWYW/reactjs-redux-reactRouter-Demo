var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
// var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrors = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  // [ { test: /\.css$/, loader: 'vue-style-loader!css-loader' },
  // { test: /\.postcss$/, loader: 'vue-style-loader!css-loader' },
  // { test: /\.less$/,
  //   loader: 'vue-style-loader!css-loader!less-loader' },
  // { test: /\.sass$/,
  //   loader: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' },

  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
      }
    ]
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrors()
  ]
})

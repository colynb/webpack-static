const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const distBase = path.resolve(__dirname, 'dist')
const extractCSS = new ExtractTextPlugin('css/[name].css')
const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: distBase,
    filename: 'app.bundle.js'
  },
  module: {
    rules: [{
      test: /\.sass$/,
      use: extractCSS.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      })
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'file-loader?name=[name].[ext]?[hash]&outputPath=img/&publicPath=/',
        'image-webpack-loader'
      ]
    }]
  },
  devServer: {
    contentBase: distBase,
    compress: true, // gzip compression
    port: 3300, // set port (localhost:3300)
    open: true, // open URL in browser on start
    stats: 'errors-only' // less verbose console logging
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'PackStrap Project',
      template: './src/index.ejs',
      minify: {
        collapseWhitespace: IS_PROD
      },
      hash: true
    }),
    extractCSS
  ]
}

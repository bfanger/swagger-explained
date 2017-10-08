const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = (process.argv.indexOf('-p') === -1) ? 'development' : 'production'
}

const webpackConfig = {
  entry: {
    'swagger-explained': ['babel-plugin-transform-runtime', './src/bootstrap.js']
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      title: 'Swagger Explained',
      favicon: './src/assets/favicon.ico'
    })
  ]
}
if (process.env.ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.unshift(new BundleAnalyzerPlugin())
}
module.exports = webpackConfig

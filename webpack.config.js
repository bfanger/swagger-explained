const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
    new HtmlWebpackPlugin({
      title: 'Swagger Explained',
      favicon: './src/assets/favicon.ico'
    })
  ]
}

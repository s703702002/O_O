const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.basic');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './src/client.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 8888,
    historyApiFallback: true,
    open: true,
  },
});

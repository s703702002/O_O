const path = require('path');
const ip = require('ip');
const merge = require('webpack-merge');
const common = require('./webpack.basic');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: './client.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000,
    // host: ip.address(),
    historyApiFallback: true,
    open: true,
  },
});

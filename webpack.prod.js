const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.basic');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: './client.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
  },
});

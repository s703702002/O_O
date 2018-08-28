const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.basic');

module.exports = merge(common, {
  mode: 'production',
  entry: {
    app: './index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
  },
});

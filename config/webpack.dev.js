const path = require("path");
const webpackCreator = require("./webpack.config");
const merge = require("webpack-merge");
const webpack = require('webpack');

const config = {
  devServer: {
    port: 8090,
    hot: true,
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  stats: 'minimal'
};

const options = {
  mode: "development",
};

module.exports = merge(webpackCreator(options), config);

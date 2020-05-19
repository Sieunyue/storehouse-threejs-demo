const path = require("path");
const webpackCreator = require("./webpack.config");
const merge = require("webpack-merge");
const webpack = require('webpack');

const config = {
  devServer: {
    port: 8090,
    hot: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const options = {
  mode: "development",
};

module.exports = merge(webpackCreator(options), config);

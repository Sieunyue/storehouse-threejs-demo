const path = require('path');
const webpackCreator = require('./webpack.config')
const merge = require('webpack-merge');

const config = {
    devServer: {
        port: 8080,
        hot: true
    }
}

const options = {
    mode: "development"
}

module.exports = merge(webpackCreator(options), config);
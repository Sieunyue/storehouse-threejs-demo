const webpackCreator = require('./webpack.config')
const merge = require('webpack-merge');

const config = {

}

const options = {
    mode: "production"
}

module.exports = merge(webpackCreator(options), config);
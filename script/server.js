/**
 * 开发脚本
 */

const webpack = require('webpack');
const webpackDev = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.dev.js');

const compiler = webpack(webpackConfig);

const options = Object.assign({}, webpackConfig.devServer, {
    // quiet: true,
    stats:{
        colors: true
    }
})

const server = new webpackDev(compiler, options);

const port = options.port || 3000;

server.listen(port, '127.0.0.1', (err) => {
    if(err){
        console.log(err);
    }
    console.log('');
    console.log('Starting server on http://localhost:'+ port);
})
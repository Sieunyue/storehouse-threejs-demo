/**
 * 构建脚本
 */

const webpack = require('webpack');
const webpackConfig = require('../config/webpack.prod.js');

webpack(webpackConfig, (err, stats) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(stats.toString({
        colors: true 
    }))
})
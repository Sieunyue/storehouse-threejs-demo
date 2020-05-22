/**
 * 开发脚本
 */

const os = require('os');
const webpack = require('webpack');
const webpackDev = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.dev.js');

const compiler = webpack(webpackConfig);

const options = Object.assign({}, webpackConfig.devServer, {
    headers:{'Access-Control-Allow-Origin':'*'},
    stats:'errors-only',
    compress: true,
    host: "0.0.0.0",
    hot: true,
    // quiet: true
})

const server = new webpackDev(compiler, options);

const port = options.port || 3000;

server.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    console.log('');
    console.log('Starting server on http://localhost:'+ port);
})



// function getIPAdress(){
//     const interfaces = os.networkInterfaces();
//     for(let devName in interfaces){
//         let iface = interfaces[devName];
//         for(let i=0;i<iface.length;i++){
//             let alias = iface[i];
//             if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
//                 return alias.address;
//             }
//         }
//     }
// }
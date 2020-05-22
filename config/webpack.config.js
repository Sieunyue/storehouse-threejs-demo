const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
module.exports = function (options) {
    return {
        mode: options.mode,
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // {
                        //     loader: MiniCssExtractPlugin.loader,
                        // },
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        // ...
                        {
                            loader: 'file-loader', //是指定使用的loader和loader的配置参数
                            options: {
                                // limit: 500, //是把小于500B的文件打成Base64的格式，写入JS
                                name: 'images/[name]_[hash:7].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    use:{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts/'
                        }
                    }
                }
            ],
        },
        resolve: {
            alias: {
                '@':  path.resolve(__dirname, '../src/')
            }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../public/index.html'),
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[id].[hash].css',
            }),
            // new webpack.HotModuleReplacementPlugin(),
        ],
    };
};

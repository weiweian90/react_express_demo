var webpack = require('webpack');
var path = require('path');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getLocalIp = require('./utils/getLocalIp');

var packageJson = require('./package.json');
// var postCSSPlugins = require('../build/postcss/plugin');

const buildTime = new Date().getTime();
const LOCAL_IP = getLocalIp();
// const LOCAL_IP = '127.0.0.1';


var babelConfig = packageJson.babel;
babelConfig.plugins.push('react-hot-loader/babel');

console.log('__dirname--', __dirname);
console.log('----loalIp', LOCAL_IP);
// return;

var config = {
    entry: {
        app: [
            `webpack-dev-server/client?http://${LOCAL_IP}:8082/`,
            'webpack/hot/dev-server',
            'react-hot-loader/patch',
            'babel-polyfill',
            path.resolve(__dirname, 'src/dev.js')
        ]
    },
    output: {
        // path: __dirname + '/dist/static',
        path: path.resolve(__dirname, 'dist/static'),
        filename: `[name].js`,
        publicPath: `http://${LOCAL_IP}:8082/static/`,
        crossOriginLoading: 'anonymous'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelConfig
                    }
                ],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: postCSSPlugins
                    //     }
                    // },
                    'less-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: `url-loader?limit=10000&name=[hash].[ext]`
            }
        ]
    },
    // devServer: {
    //     hotOnly: true,
    //     inline: true,
    //     quiet: true,
    //     host: '0.0.0.0',
    //     port: 8082,
    //     headers: {
    //         "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //     publicPath: `http://${LOCAL_IP}:8082/static/`,
    //     compress: true,
    //     contentBase: `http://${LOCAL_IP}:8082/static/`
    // },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, 'node_modules')
                    ) === 0
                );
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: 'index.html',
            TITLE: '<% TITLE %>',
            HTML: '<% HTML %>',
            buildTime: buildTime,
            inject: true,
            // inject: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin()
    ]
};

module.exports = config;

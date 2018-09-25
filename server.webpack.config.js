var webpack = require('webpack');
var path = require('path');
var packageJson = require('./package.json');

var babelConfig = packageJson.babel;

babelConfig.presets.shift();
babelConfig.presets.unshift(['env', { target: { node: 'current' }}]);

module.exports = {
    name: 'server',
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    externals:  function (context, request, callback) {
        if (request[0] !== '.') {
            callback(null, request);
        } else {
            callback();
        }
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
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.(less|css)$/)
    ]
};
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var express = require('express');
// var fs = require('fs');
var getLocalIp = require('./utils/getLocalIp');
var app = express();

var devConfig = require('./dev.webpack.config');
var serverConfig = require('./server.webpack.config');

var LOCAL_IP = getLocalIp();
const SERVER_JS_PATH = path.resolve(__dirname, './dist/server.js');
var devCompiler = webpack(devConfig);
var serverCompiler = webpack(serverConfig);


var server = null;

var webpackDevServer = new WebpackDevServer(devCompiler, {
    hot: true,
    quiet: true,
    headers: {
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Origin": "*"
    },
    publicPath: `http://${LOCAL_IP}:8082/static/`
});

webpackDevServer.listen(8082, '0.0.0.0');

app.use(function (req, res, next) {
    server ? server(req, res, next) : res.send('server starting...');
});

app.use(function (err, req, res) {
    // console.log(err.stack);
    res.status(500).send(JSON.stringify({
        code: err.code,
        message: err.message,
        stack: err.stack
    }));
});

app.listen(process.env.HTTP_PORT || 8081, '0.0.0.0');

// 此处使用serverCompiler只是监听server.js的变化
serverCompiler.watch({}, function (err) {
    if (err) {
        return;
    }
    if (require.cache[SERVER_JS_PATH]) {
        delete require.cache[SERVER_JS_PATH];
    }

    try {
        server = require('./dist/server.js')({
            getTemplate: function () {
                try {
                    return webpackDevServer
                        .middleware
                        .fileSystem
                        .readFileSync(__dirname + '/dist/static/index.html', 'utf-8');
                } catch (err) {
                    return 'Assets building...test';
                }
            }
        });
    } catch (err) {
        console.log(err);
    }

});
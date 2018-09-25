var express = require('express');
var fs = require('fs');
// var compression = require('compression');


var server = require('./dist/server.js');
var template = fs.readFileSync('./dist/static/index.html', 'utf-8');
var app = express();


// app.use('/static', compression());

app.use(server({
    getTemplate: function () {
        return template;
    }
}));

app.listen(process.env.HTTP_PORT || 8081, '0.0.0.0');

console.log('worker started');
const express = require('express');
const app = express();
const router = require('./routes/index.js').default;

module.exports = function (config) {
    function render(req, res) {
        var html = config.getTemplate().replace(/<% TITLE %>/, '221react-express-demo')
            .replace(/<% HTML %>/, res.reactHtml || '');
        // console.log('html-----', html);
        res.send(html);
    }
    app.use(router);
    app.use(render);
    return app;
};

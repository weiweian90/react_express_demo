var run = require('parallel-webpack').run;

run(require.resolve('./webpack.config.js'), {
    maxConcurrentWorkers: 3,
    maxRetries: 1,
    watch: false
}, function (err) {
    if (err) {
        console.error(err.message);
    }
});
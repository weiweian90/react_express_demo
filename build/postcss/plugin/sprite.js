var postcss = require('postcss');
var sprites = require('postcss-sprites');
var updateRule = require('postcss-sprites/lib/core').updateRule;
var path = require('path');


module.exports = sprites({
    retina: true,
    spritePath: `${__dirname}/dist/static/`,
    filterBy: function (image) {
        if (image.url.indexOf('image/lib/sprite/') == -1 ||
            !/\.png$/.test(image.url)
        ) {
            return Promise.reject();
        } else {
            return Promise.resolve();
        }
    },
    hooks: {
        onUpdateRule: function (rule, token, image) {
            updateRule(rule, token, image);

            ['width', 'height'].forEach(function(prop) {
                var value = image.coords[prop];
                if (value % image.ratio) {
                    let filename = path.basename(image.path);

                    throw new Error(`${filename}.${prop} = ${value} 不能被${image.ratio}整除`);
                }

                if (image.retina) {
                    value /= image.ratio;
                }
                rule.insertAfter(rule.last, postcss.decl({
                    prop: prop,
                    value: value + 'px'
                }));
            });
        }
    },
    spritesmith: {
        padding: 6
    }
});

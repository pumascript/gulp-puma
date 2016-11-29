// Copyright (c) 2016 - present UTN-LIS

'use strict';

var path = require('path'),
    gulpUtil = require('gulp-util'),
    through = require('through2'),
    puma = require('pumascript');

module.exports = function (fileName) {
    if (!fileName) {
        throw new gulpUtil.PluginError('gulp-puma', gulpUtil.colors.green('fileName') + ' required');
    }

    var firstFile,
        content = '';

    return through.obj(function (file, enc, callback) {
        if (!firstFile) {
            firstFile = file;
        }

        content += file.contents.toString();

        callback();
    }, function (callback) {
        if (!firstFile) {
            callback();
            return;
        }

        var result = puma.evalPuma(content);

        gulpUtil.log('PumaScript run successful');

        this.push(new gulpUtil.File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: path.join(firstFile.base, 'result.js'),
            contents: new Buffer(result.output)
        }));

        callback();
    });
};

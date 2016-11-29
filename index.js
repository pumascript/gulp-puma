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

    return through.obj(function (file, enc, cb) {
        if (!firstFile) {
            firstFile = file;
        }

        content += file.contents.toString();

        cb();
    }, function (cb) {
        if (!firstFile) {
            cb();
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

        cb();
    });
};

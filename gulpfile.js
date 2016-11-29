// Copyright (c) 2016 - present UTN-LIS

'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    jsonlint = require('gulp-jsonlint'),
    puma = require('./');

gulp.task('eslint', function () {
    return gulp.src(['index.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('jsonlint', function () {
    return gulp.src(['package.json', '.eslintrc.json'])
        .pipe(jsonlint())
        .pipe(jsonlint.reporter())
        .pipe(jsonlint.failAfterError());
});

gulp.task('test-plugin', function () {
    return gulp.src('tests/files/*')
        .pipe(puma('test.zip'))
        .pipe(gulp.dest('dest/output.js'));
});

gulp.task('lint', ['eslint', 'jsonlint']);
gulp.task('default', ['lint']);

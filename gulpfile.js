// Copyright (c) 2016 - present UTN-LIS

'use strict';

var gulp = require('gulp'),
    puma = require('./');

gulp.task('default', function () {
	return gulp.src('tests/files/*')
		.pipe(puma('test.zip'))
		.pipe(gulp.dest('dest/output.js'));
});

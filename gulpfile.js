/*
 * Fork of https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js
 *
 * Install:
 * >> npm install --save-dev <gulp-*> <gulp-*> etc
 *
 * Usage:
 * >> gulp
 * >> gulp --type production
 *
 */


var gulp = require('gulp');
	expect = require('gulp-expect-file'), 
	jshint = require('gulp-jshint'),
	sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

var PATH = {
 js: ['src/javascript/**/*.js'],
 sass: ['src/scss/**/*.scss'],
 html: ['src/*.html', '!src/test.html'],   // !file -> skips (ignores) the file
 dist: 'dist/'
};


//-------
gulp.task('default', ['watch']);

//-------
gulp.task('clean', function () {
    return gulp.src(PATH.dist, {read: false})
        .pipe(clean());
});

//-------
gulp.task('copyHtml', function() {
  return gulp 	.src(PATH.html)
  				.pipe(expect(PATH.html))	// validate and fails if missing file
  				.pipe(gulp.dest(PATH.dist));
});

//-------
gulp.task('build-css', function() {
    return gulp .src(PATH.sass)
    			.pipe(sourcemaps.init())  // Process the original sources
      			.pipe(sass())
	    		.pipe(sourcemaps.write()) // Add the map to modified source.
	    		.pipe(gulp.dest(PATH.dist + 'assets/stylesheets'));
});

//-------
gulp.task('jshint', function() {
  return gulp 	.src(PATH.js)
    			.pipe(jshint())
    			.pipe(jshint.reporter('jshint-stylish', {beep: true}));
});


//-------
gulp.task('build-js', ['jshint'], function() {
  return gulp 	.src(PATH.js)
    			.pipe(sourcemaps.init())
      			.pipe(concat('bundle.js'))
      			//only uglify if gulp is ran with '--type production'
      			.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    			.pipe(sourcemaps.write())
    			.pipe(gulp.dest(PATH.dist + 'assets/javascript'));
});

//-------
// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(PATH.js, ['build-js']);
  gulp.watch(PATH.sass, ['build-css']);
});

//-------
gulp.task('build', ['build-js', 'build-css']);

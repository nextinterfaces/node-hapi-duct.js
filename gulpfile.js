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


const gulp = require('gulp'),
    expect = require('gulp-expect-file'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),
    dust = require('gulp-dust');

const PATH = {
    js: ['web/js/**/*.js'],
    sass: ['web/scss/**/*.scss'],
    html: ['web/*.html', '!web/test.html'],   // !file -> skips (ignores) the file
    dist: 'dist/'
};

//-------
gulp.task('build-templates', () => {
    return gulp.src('templates/*')
        .pipe(dust())
        .pipe(gulp.dest('dist/templates'));
});

//-------
gulp.task('default', ['watch']);

//-------
gulp.task('clean', function () {
    return gulp.src(PATH.dist + '**/*', {read: false})
        .pipe(clean());
});

//-------
gulp.task('build-html', function () {
    return gulp.src(PATH.html)
        .pipe(expect(PATH.html))	// validate and fails if missing file
        .pipe(gulp.dest(PATH.dist + 'web'));
});

//-------
gulp.task('build-css', function () {
    return gulp.src(PATH.sass)
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(sass())
        .pipe(minifycss())
        .pipe(sourcemaps.write()) // Add the map to modified source.
        .pipe(gulp.dest(PATH.dist + 'web/css'));
    // .pipe(livereload(server));
});

//-------
gulp.task('jshint', function () {
    return gulp.src(PATH.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {beep: true}));
});


//-------
gulp.task('build-js', ['jshint'], function () {
    return gulp.src(PATH.js)
        .pipe(sourcemaps.init())
        .pipe(concat('compiled.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATH.dist + 'web/js'));
});

//-------
// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {


    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        }
        console.log('server started on port 35729');

        gulp.watch(PATH.js, ['build-js']);
        gulp.watch(PATH.sass, ['build-css']);

        // // Watch .scss files
        // gulp.watch(PATH.sass, function (event) {
        //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        //     gulp.start('build-css');
        // });
        //
        // // Watch .js files
        // gulp.watch('web/scripts/**/*.js', function (event) {
        //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        //     gulp.run('scripts');
        // });
        //
        // // Watch image files
        // gulp.watch('web/images/**/*', function (event) {
        //     console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        //     gulp.run('images');
        // });

    });

});

//-------
gulp.task('build', ['build-html', 'build-templates', 'build-js', 'build-css']);

var gulp = require('gulp');
var noprotocol = require('gulp-noprotocol');
var livereload = require('gulp-livereload');

gulp.task('css', function() {
    return gulp.src('sass/**/*.{scss,sass}')
        .pipe(noprotocol.css())
        .on('error', noprotocol.notify)
        .pipe(gulp.dest('dist'));
});

gulp.task('bundle-libs', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/marked/marked.min.js',
        'bower_components/angular-marked/angular-marked.min.js'
    ])
    .pipe(noprotocol.bundle('libs.bundle.js'))
    .on('error', noprotocol.notify)
    .pipe(gulp.dest('dist'));
});

gulp.task('bundle-app', function () {
    return gulp
        .src([
            'js/**/*.js',
            'views/**/*.html',
            'js/directives/**/*.html'
        ])
        .pipe(noprotocol.angular({
            deps: ['hc.marked']
        }))
        .on('error', noprotocol.notify)
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['css', 'bundle-app', 'bundle-libs'], function() {

    livereload.listen();
    gulp.watch('sass/**/*.{scss,sass}', ['css']);
    gulp.watch(['js/**/*.js', 'views/**/*.html'], ['bundle-app']);
    gulp.watch([
        'dist/*.css',
        'dist/*.js',
        '*.json',
        'index.html'
    ]).on('change', livereload.changed);
});

gulp.task('deploy', ['css', 'bundle-libs', 'bundle-app']);

gulp.task('default', ['watch']);

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    wiredep = require('wiredep').stream;

gulp.task('serve', function () {
  connect.server({
    livereload: true,
    port: 9000,
    root: 'dist'
  });
});

gulp.task('reload', function () {
  gulp.src('./dist/**/*.*')
      .pipe(connect.reload());
});

gulp.task('bower', function () {
  gulp.src('./client/*.html')
      .pipe(wiredep({
        ignorePath: 'dist/'
      }))
      .pipe(gulp.dest('./dist'));
})

gulp.task('babel', function () {
  gulp.src('./client/js/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(concat('app.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./client/**/*.html'], ['bower']);
  gulp.watch(['./client/js/**/*.js'], ['babel']);
  gulp.watch(['./dist/**/*.*'], ['reload']);
});

gulp.task('default', ['serve', 'babel', 'bower', 'watch']);

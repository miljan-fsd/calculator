/* File: gulpfile.js */

// Grab packages
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload

/**********************
  HTML TASKS
**********************/
// Copy HTML File
gulp.task('copy', function() {
  return gulp.src('app/index.html').pipe(gulp.dest('dist'))
})

/**********************
  JS TASKS
**********************/
// Uglify JS Files
gulp.task('uglify', function(cb) {
  pump([gulp.src('app/src/js/*.js'), uglify(), gulp.dest('dist/src/js/')], cb)
})

/**********************
  STYLES TASKS
**********************/
// SASS Task with autoprefixer
gulp.task('sass', function() {
  return gulp
    .src('app/src/scss/*.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(
      autoprefixer({
        browsers: ['last 2 version', '> 1%'],
        cascade: true
      })
    )
    .pipe(gulp.dest('app/src/css'))
})

// Minify CSS
gulp.task('minify-css', function() {
  return gulp
    .src('app/src/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/src/css/'))
})

/**********************
  SERVER TASKS
**********************/
// Livereload Task
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })

  gulp.watch(
    ['*.html', 'src/**/*.scss', 'src/**/*.css', 'src/**/*.js'],
    { cwd: 'app' },
    reload
  )
})

/**********************
  DEFAULT TASKS
**********************/
// Default Task
gulp.task('default', ['copy', 'sass', 'minify-css', 'uglify', 'serve', 'watch']) // Watch Task always last

// Configure which files to watch

gulp.task('watch', function() {
  gulp.watch('app/src/scss/*.scss', ['sass'])
  gulp.watch('app/src/css/*.css', ['minify-css'])
  gulp.watch('app/src/js/*.js', ['uglify'])
})

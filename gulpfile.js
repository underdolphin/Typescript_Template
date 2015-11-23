// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var typescript = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var dir = {
  dist: 'dist',
  src: 'src'
};

// server
gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      port: '8080',
      livereload: true,
      open: true,
      fallback: './src/index.html'
    }));
});

// typescript compile
var typescriptProject = typescript.createProject({
  target: 'ES5',
  module: 'commonjs',
  removeComments: true,
  sortOutput: true,
  experimentalDecorators:true,
  emitDecoratorMetadata:true,
  experimentalAsyncFunctions:false
});

gulp.task('typescript-compile', function() {
  gulp.src([dir.src + '/{,**/}*.ts'])
    .pipe(plumber())
    .pipe(typescript(typescriptProject))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./src'));
});

gulp.task('uglify', function() {
  gulp.src(dir.src + '/{,**/}*.js')
    .pipe(plumber())
    .pipe(uglify({
      mangle:false
    }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest(dir.src));
});

// watch
gulp.task('watch', function() {
  gulp.watch([
    dir.src + '/{,**/}*.ts'
  ], ['typescript-compile']);
  gulp.watch([
    dir.src + '/app.js'
  ], ['uglify']);
});

// css auto prefix
gulp.task('autoprefixer', function() {
  gulp.src(dir.src + '/{,**/}*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(dir.dist));
});

// files clean
// app folder clean
gulp.task('clean', function() {
  gulp.src([
      dir.dist + '/{,**/}*.html',
      dir.dist + '/{,**/}*.css',
      dir.dist + '/{,**/}*.js'
    ], {
      read: false
    })
    .pipe(clean())
});

// copy files to app folder
gulp.task('copy', function() {
  return gulp.src([
      dir.src + '/{,**/}*.html',
      dir.src + '/{,**/}*.js'
    ])
    .pipe(gulp.dest(dir.dist));
});

gulp.task('default', [
  'typescript-compile',
  'serve',
  'watch'
]);

gulp.task('release', function(callback) {
  return runSequence(
    'clean',
    'autoprefixer',
    'copy'
  );
});

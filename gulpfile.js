var gulp = require('gulp');
var dotenv = require('gulp-dotenv');
const template = require('gulp-template');

const { series } = require('gulp');

require('dotenv').config();

function copy() {
    var sourceFiles = ['src/*'];
    var destination = 'public/';

    return gulp.src(sourceFiles)
        .pipe(template({FCM_WEBAPIKEY: process.env.FCM_WEBAPIKEY}))
        .pipe(gulp.dest(destination));
}

function build(cb) {
    console.log("Done!" + process.env.apikey);
    cb();
  }
  
  exports.build = build;
  exports.default = series(copy, build);
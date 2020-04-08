var gulp = require('gulp');
const template = require('gulp-template');

const { watch, series } = require('gulp');

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
exports.default = function() {
    watch('src/*', series(copy, build));
}
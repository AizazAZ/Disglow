var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var svgSprites = require('gulp-svg-sprites');
var livereload = require('gulp-livereload');

gulp.task('default', ['lint', 'sass', 'js']);

gulp.task('sass', function() {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public_html/assets/css'));
});

gulp.task('js', function() {
	return gulp.src([
		'assets/js/global.js',
		'assets/js/objects/*.js'
	])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('./public_html/assets/js'));
});

gulp.task('lint', function() {
	
});

gulp.task('production', function() {
	
});

gulp.task('watch', function() {
	gulp.watch('assets/js/*.js', ['js']);
	gulp.watch('assets/scss/*.scss', ['sass']);
});
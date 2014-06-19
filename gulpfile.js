var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var svgSprites = require('gulp-svg-sprites');
var livereload = require('gulp-livereload');
var prefix = require('gulp-autoprefixer');
var gargoyle = require('gargoyle');
var spritesmith = require("gulp-spritesmith");
var gulpif = require("gulp-if");
var complexity = require('gulp-complexity');

var LIVERELOAD_PORT = 35729;

var svg = svgSprites.svg;
var png = svgSprites.png;

gulp.task('default', ['lint', 'scss', 'js']);

gulp.task('scss', function() {
	return gulp.src('assets/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public_html/assets/css'))
		.pipe(livereload({ auto: false }));
});

gulp.task('js', function() {
	return gulp.src([
		'assets/js/global.js',
		'assets/js/objects/*.js'
	])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('./public_html/assets/js'))
	.pipe(livereload({ auto: false }));
});

gulp.task('svg', function() {
	return gulp.src('assets/images/svg-sprites/*.svg')
		.pipe(svg({
			padding:10,
			generatePreview: false,
			cssFile: '../../../assets/scss/_svg-sprites.scss',
			svgPath:   "../images/%f",
			pngPath:   "../images/%f",
			className: ".sprite-%f"
		}))
		.pipe(gulp.dest("public_html/assets/images"))
		.pipe(png())
		.pipe(livereload({ auto: false }));
});

gulp.task('png', function() {
	return gulp.src('assets/images/png-sprites/*.png')
		.pipe(spritesmith({
			imgName: 'sprite-png.png',
			styleName: '_png-sprites.scss',
			imgPath: '../images/sprites/sprite-png.png',
			styleTemplate: 'assets/images/png-sprites/css.template.mustache'
		}))
		.pipe(gulpif('*.png', gulp.dest('public_html/assets/images/sprites')))
		.pipe(gulpif('*.scss', gulp.dest('assets/scss')))
		.pipe(livereload({ auto: false }));

});

gulp.task('png-retina', function() {
	return gulp.src('assets/images/png-sprites-retina/*.png')
		.pipe(spritesmith({
			imgName: 'sprite-png-retina.png',
			styleName: '_png-sprites-retina.scss',
			imgPath: '../images/sprites/sprite-png-retina.png',
			styleTemplate: 'assets/images/png-sprites-retina/retina.template.mustache'
		}))
		.pipe(gulpif('*.png', gulp.dest('public_html/assets/images/sprites')))
		.pipe(gulpif('*.scss', gulp.dest('assets/scss')))
		.pipe(livereload({ auto: false }));

});

gulp.task('lint', function() {
	//Tasks for checking whether code is good or not
	return gulp.src([
		'assets/js/global.js',
		'assets/js/objects/*.js'
	])
	.pipe(complexity({
		hideComplexFunctions: false,
		errorsOnly: false,
		breakOnErrors: false
	}));
});

gulp.task('production', function() {
	//Auto prefix
	//.pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
	//Minimise css
	//Uglify javascript
});

gulp.task('watch', function() {
	livereload.listen(LIVERELOAD_PORT);
	createWatcher('assets/scss/', 'scss', 1000);
	createWatcher('assets/js/', 'js', 1000);
	createWatcher('assets/images/svg-sprites/', 'svg', 1000);
	createWatcher('assets/images/png-sprites/', 'png', 1000);
	createWatcher('assets/images/png-sprites-retina/', 'png-retina', 1000);
});


function createWatcher(glob, taskName, poll){
	var options = {
		type: 'watchFile',
		interval: poll
	};
	gargoyle.monitor(glob, options, function(err, monitor) {
		if (err) {
			console.error(err);
			return;
		}
		monitor.on('modify', function(filename) {gulp.start(taskName);});
		monitor.on('delete', function(filename) {gulp.start(taskName);});
		monitor.on('create', function(filename) {gulp.start(taskName);});
	});
}


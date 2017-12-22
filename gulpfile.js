/*!
 * Gulpfile
 * since 2015-07-20
 * author juanpablob <m.juanpablob@gmail.com>
 */

var	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	src = './src',
	dist = './dist',
	bower = './bower_components',
	scripts = [
		bower + '/jquery/dist/jquery.js',
		bower + '/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
		bower + '/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
		src + '/**/*.js'
	];

// Compile Styles
gulp.task('styles', function() {
	gulp.src(src + '/styles/styles.scss')
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			onError: function(error) {
				console.log(error);
			}
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(dist + '/styles/'));
});

// Compile Scripts
gulp.task('scripts', function() {
	gulp.src(scripts)
		.pipe($.concat('scripts.js'))
		.pipe(gulp.dest(dist + '/scripts/'));
});

// Validate Scripts
gulp.task('jshint', function() {
	gulp.src(src + '/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
});

// Watchers
gulp.watch(src + '/**/*.js', function() {
	gulp.start('scripts');
	gulp.start('jshint');
});

gulp.watch(src + '/styles/**/*.scss', function() {
	gulp.start('styles');
});

// Default
gulp.task('default', function() {
	gulp.start('styles');
	gulp.start('scripts');
	gulp.start('jshint');
});

// Build for dist
gulp.task('build', function() {
	gulp.src(src + '/styles/styles.scss')
		.pipe($.sass({
			outputStyle: 'compressed'
		}))
		.pipe($.rename({suffix: '.min'}))
		.pipe(gulp.dest(dist + '/styles/'));

	gulp.src(scripts)
		.pipe($.concat('scripts.js'))
		.pipe($.stripDebug())
		.pipe($.jsmin())
		.pipe($.rename({suffix: '.min'}))
		.pipe(gulp.dest(dist + '/scripts/'));
});

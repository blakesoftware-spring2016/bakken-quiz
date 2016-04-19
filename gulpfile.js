var gulp = require('gulp');
var gulpConcat = require('gulp-concat');
var uglify = require('gulp-uglify');

function minify() {
	return gulp.src(['./app/app.js', './app/controllers.js', './lib/file2.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/'));
}

gulp.task('build',
	gulp.series('minify')
);

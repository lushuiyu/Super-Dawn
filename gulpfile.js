const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Compile Sass
function compileSass() {
  return gulp.src('./scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(gulp.dest('style'))
}
gulp.task('compileSass', compileSass);

// Watch Sass
gulp.task("watchSass", function () {
  gulp.watch("./scss/**/*.scss", compileSass);
});
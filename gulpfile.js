const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname, 'assets'));
// Compile Sass
function compileSass() {
  return gulp.src('./scss/**/*.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(gulp.dest('assets'))
}
// Compress Js
function compressJs() {
  return gulp
    .src("js/**/*.js") // 找到要压缩的 JS 文件
    .pipe(uglify()) // 压缩文件
    .pipe(gulp.dest("assets")); // 存储压缩后的文件到指定目录
}
gulp.task("compressJs", compressJs);
gulp.task('compileSass', compileSass);

// Watch Sass And Js
gulp.task("watch", function () {
  // gulp.watch(["./scss/**/*.scss", "./js/**/*.js"], function (file) {
  //   console.log(file.path + " has been changed");
  //   if (file.path.endsWith(".scss")) {
  //     compileSass();
  //   } else if (file.path.endsWith(".js")) {
  //     compressJs();
  //   }
  // });
  gulp.watch("./js/**/*.js", compressJs);
  gulp.watch("./scss/**/*.scss", compileSass);
});

/**
 * For the project initialization phase
 * This script is used to copy all the files in the assets folder to the corresponding folders in the scss and js folders.
*/
// Init JS Files And Sass Files
gulp.task("init", function initFiles() {
  return new Promise((resolve, reject) => { 
    try {
      for (const file of files) {
        const filePath = path.join(__dirname, "assets", file);
        const copyCssPath = path.join(__dirname, "scss", file.replace(".css", ".scss"));
        const copyJsPath = path.join(__dirname, "js", file);
        if (file.includes(".js")) {
          if (!fs.existsSync(copyJsPath)) { // 文件已经存在时不做操作
            fs.copyFile(filePath, copyJsPath, (err) => {
              if (err) throw err;
              console.log(`${filePath} 已成功复制到 ${copyJsPath}`);
            });
          }
        } else if (file.includes(".css")) {
          if (!fs.existsSync(copyCssPath)) {
            fs.copyFile(filePath, copyCssPath, (err) => {
              if (err) throw err;
              console.log(`${filePath} 已成功复制到 ${copyCssPath}`);
            });
          }
        }
      }
      resolve();
    } catch (err) {
      console.error(err);
      reject(err);
    }
  })
});
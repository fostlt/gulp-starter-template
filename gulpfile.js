const gulp = require("gulp"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint");


gulp.task("lint", function(){
    return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
});

gulp.task("scripts", gulp.series("lint",
    function scripts() {
        return gulp
        .src("./js/*.js")
        .pipe(terser())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("./build/js"));
    })
);

gulp.task("say_hello", function(done) {
  console.log("Hello!");
  done();
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(["*.html", "build/js/*.js","css/*.css"])
        .on("change", browserSync.reload);
});

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
});

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "yourlocal.dev"
//     });
// });

gulp.task("default", gulp.parallel("scripts","browser-sync"));

// const gulp = require("gulp"); // Load Gulp!
// // Now that we've installed the terser package we can require it:
// const terser = require("gulp-terser"),
//   rename = require("gulp-rename");
// gulp.task("default", function() {
//   return gulp
//     .src("./js/*.js") // What files do we want gulp to consume?
//     .pipe(terser()) // Call the terser function on these files
//     .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
//     .pipe(gulp.dest("./build/js")); // Where do we put the result?
// });

// // Require Gulp first!
// const gulp = require("gulp");
// // This is a very basic Gulp task,
// // with a name and some code to run
// // when this task is called:
// gulp.task("default", function(done) {
//   console.log("Hello world");
//   done();
// });

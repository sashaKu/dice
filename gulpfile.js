import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sync from 'browser-sync';

// Server

export const server = () => {
  sync.init({
    server: {
      baseDir: 'source/build'
    },
    notify: false,
    ui: false
  });
}

// Styles

export const styles = () => {
  return gulp.src("source/less/styles.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/build/css"))
    .pipe(sync.stream());
}

// Include HTML

export const html = () => {
  return gulp.src("source/index.html")
    .pipe(gulp.dest("source/build"))
    .pipe(sync.stream());
}

// js

export const js = () => {
  return gulp.src("source/js/common.js")
    .pipe(gulp.dest("source/build/js"))
    .pipe(sync.stream());
}

// Watcher

export const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/js/common.js", gulp.series("js"));
  gulp.watch("source/index.html", gulp.series("html"));
}

export default gulp.series(
  gulp.parallel(
    server,
    html,
    styles,
    watcher
  )
);

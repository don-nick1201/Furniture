const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

function vendorJS() {
  const modules = [
    'node_modules/swiper/swiper-bundle.min.js',
    'node_modules/swiper/swiper-bundle.min.js.map',
  ];

  return gulp.src(modules)
    .pipe(gulp.dest('build/js'));
};

function vendorCSS() {
  const modules = [
    'node_modules/swiper/swiper-bundle.min.css',
  ];

  return gulp.src(modules)
    .pipe(gulp.dest('build/css/pages'));
};

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
};

exports.html

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// copyImages

const copyImages = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

// Scripts

  const scripts = () => {
    return gulp.src('./source/js/script.js')
      .pipe(sourcemap.init())
      .pipe(terser())
      .pipe(rename('script.min.js'))
      .pipe(sourcemap.write("."))
      .pipe(gulp.dest('./build/js'))
      .pipe(sync.stream());
  }
    
  exports.scripts = scripts;
   

//build

const build = gulp.series(
  vendorCSS,
  vendorJS,
  scripts,
  copyImages,
  html,
  styles
);

exports.build = build;


// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: './source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  gulp.watch("source/*.html").on("change", sync.reload);
  gulp.watch("source/less/**/*.less", styles);
  // gulp.watch("source/js/script.js", scripts);
  // gulp.watch("source/*.html", html);
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, vendorCSS, vendorJS, server, watcher
);

const gulp = require('gulp')
const babel = require('gulp-babel')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const os = require('os')
const open = require('gulp-open')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const umd = require('gulp-umd')
const uglify = require('gulp-uglify')
const watch = require('gulp-watch')

const cleanDist = () => {
  return gulp.src('./dist/**/*.*').pipe(clean())
}

const cleanDocs = () => {
  return gulp.src('./docs/js/*.js').pipe(clean())
}

const cleanAll = gulp.parallel(cleanDist, cleanDocs)

const copy = () => {
  return gulp
    .src('./src/es6/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(gulp.dest('dist/es6'))
}

const openDocs = () => {
  let browser
  if (os.platform() === 'darwin') {
    browser = os.platform() === 'linux'
      ? 'google-chrome'
      : 'google chrome'
  } else {
    if (os.platform() === 'win32') {
      browser = os.platform() === 'linux'
        ? 'google-chrome'
        : 'chrome'
    } else {
      browser = os.platform() === 'linux'
        ? 'google-chrome'
        : 'firefox'
    }
  }
  return gulp.src('docs/index.html').pipe(
    open({
      app: browser,
      uri: 'http://localhost:8090'
    })
  )
}

const connectDocs = () => {
  return connect.server({
    root: 'docs',
    port: 8090,
    livereload: true
  })
}

const reload = () => {
  return connect.reload()
}

const lint = () => {
  return gulp
    .src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

const transpile = () => {
  return gulp
    .src('./src/delegate.js')
    .pipe(babel())
    .pipe(
      umd({
        exports: function () {
          return 'delegate'
        },
        namespace: function () {
          return 'delegate'
        }
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('docs/js'))
    .pipe(uglify())
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'))
}

const watchSourceCode = () => {
  return watch(
    'src/**/*.js',
    {
      ignoreInitial: false
    },
    gulp.series(lint, transpile, copy)
  ).pipe(reload())
}

const watchDocs = () => {
  return watch('docs/**/*.*').pipe(reload())
}

const watchAll = gulp.parallel(watchSourceCode, watchDocs)

const dev = gulp.parallel(lint, transpile, connectDocs, watchAll, openDocs)
const build = gulp.series(cleanAll, lint, transpile, copy)

module.exports.cleanDist = cleanDist
module.exports.cleanDocs = cleanDocs
module.exports.clean = cleanAll
module.exports.copy = copy
module.exports.lint = lint
module.exports.transpile = transpile
module.exports.conect = connectDocs
module.exports.reload = reload
module.exports.watchSourceCode = watchSourceCode
module.exports.watchDocs = watchDocs
module.exports.watch = watchAll
module.exports.start = dev
module.exports.dev = dev
module.exports.build = build

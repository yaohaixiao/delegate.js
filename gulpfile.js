const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
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

const openDocs = () => {
  let browser
  if (os.platform() === 'darwin') {
    browser = os.platform() === 'linux' ? 'google-chrome' : 'google chrome'
  } else {
    if (os.platform() === 'win32') {
      browser = os.platform() === 'linux' ? 'google-chrome' : 'chrome'
    } else {
      browser = os.platform() === 'linux' ? 'google-chrome' : 'firefox'
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
    .pipe(plumber())
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
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest('./docs/js'))
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
    .pipe(gulp.dest('./'))
    .pipe(gulp.dest('docs/js'))
}

const watchSource = () => {
  return watch(
    'src/**/*.js',
    {
      ignoreInitial: false
    },
    gulp.series(lint, transpile)
  ).pipe(reload())
}

const watchDocs = () => {
  return watch('docs/**/*.*').pipe(reload())
}

const watchAll = gulp.parallel(watchSource, watchDocs)

const dev = gulp.parallel(lint, transpile, connectDocs, watchAll, openDocs)
const build = gulp.series(lint, cleanAll, transpile)

module.exports.start = dev
module.exports.build = build
module.exports.cleanDist = cleanDist
module.exports.cleanDocs = cleanDocs
module.exports.clean = cleanAll
module.exports.lint = lint
module.exports.reload = reload
module.exports.transpile = transpile
module.exports.watchSource = watchSource
module.exports.watchDocs = watchDocs
module.exports.watch = watchAll

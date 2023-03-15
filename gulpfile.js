const gulp = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const prettier = require('gulp-prettier')
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
  return gulp.src('./docs/lib/*.js').pipe(clean())
}

const cleanAll = gulp.parallel(cleanDist, cleanDocs)

const SOURCE_PATH = ['./src/**/*.js', './esm/**/*.js']

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
    .src(SOURCE_PATH)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
}

const check = () => {
  return gulp.src(SOURCE_PATH).pipe(prettier.check({ editorconfig: true }))
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
    .pipe(gulp.dest('./docs/lib'))
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
    .pipe(gulp.dest('docs/lib'))
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
const build = gulp.series(lint, check, cleanAll, transpile)

module.exports.start = dev
module.exports.build = build
module.exports.cleanDist = cleanDist
module.exports.cleanDocs = cleanDocs
module.exports.clean = cleanAll
module.exports.lint = lint
module.exports.check = check
module.exports.reload = reload
module.exports.transpile = transpile
module.exports.watchSource = watchSource
module.exports.watchDocs = watchDocs
module.exports.watch = watchAll

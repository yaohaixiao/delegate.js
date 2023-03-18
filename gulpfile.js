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

const SOURCE_PATH = ['./src/**/*.js', './esm/**/*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanDist = () => {
  return gulp.src('./dist/**/*.*').pipe(clean())
}

const cleanDocs = () => {
  return gulp.src('./docs/lib/*.js').pipe(clean())
}

const cleanAll = gulp.parallel(cleanDist, cleanDocs)

/* ==================== 文档查看相关的 gulp 任务 ==================== */
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

/* ==================== 代码规范校验相关的 gulp 任务 ==================== */
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

/* ==================== 编译 JavaScript 代码的 gulp 任务 ==================== */
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

/* ==================== 检测源代码变更相关的 gulp 任务 ==================== */
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

const start = gulp.parallel(lint, transpile, connectDocs, watchAll, openDocs)
const build = gulp.series(lint, check, cleanAll, transpile)
const test = gulp.series(lint, check)

module.exports.start = start
module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchAll

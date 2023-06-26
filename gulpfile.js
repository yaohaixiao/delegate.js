const path = require('path')
const gulp = require('gulp')
const clean = require('gulp-clean')
const connect = require('gulp-connect')
const eslint = require('gulp-eslint')
const prettier = require('gulp-prettier')
const os = require('os')
const open = require('gulp-open')
const pug = require('gulp-pug')
const less = require('gulp-less')
const LessAutoPrefix = require('less-plugin-autoprefix')
const autoprefixer = new LessAutoPrefix({ browsers: ['last 2 versions'] })
const cssmin = require('gulp-cssmin')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const run = require('gulp-run')
const watch = require('gulp-watch')

const SOURCE_PATH = [ 'esm/**/*.js']

/* ==================== 清理相关 gulp 任务 ==================== */
const cleanHtml = () => {
  return gulp.src('docs/**/index.html').pipe(clean())
}

const cleanStyle = () => {
  return gulp.src('docs/css/*.css').pipe(clean())
}

const cleanScript = () => {
  return gulp.src('docs/js/*.js').pipe(clean())
}

const cleanDocs = gulp.parallel(cleanHtml, cleanStyle, cleanScript)

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

const test = gulp.series(lint, check)

/* ==================== 编译 API 文档代码的 gulp 任务 ==================== */
const buildPug = () => {
  return gulp
    .src('api/pug/index.pug')
    .pipe(
      pug({
        verbose: true
      })
    )
    .pipe(gulp.dest('docs'))
}

const buildStyle = () => {
  return gulp
    .src('api/less/docs.less')
    .pipe(sourcemaps.init())
    .pipe(
      less({
        paths: [path.join(__dirname, 'less', 'includes')],
        plugins: [autoprefixer]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
}

const minifyStyle = () => {
  return gulp
    .src('docs/css/docs.css')
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('docs/css'))
}

const buildSource = () => {
  return run('npm run build:lib').exec()
}

const buildScript = () => {
  return gulp
    .src(['delegate.min.js', 'api/js/docs.js', 'api/js/scroll.js'])
    .pipe(concat('docs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
}

const buildDocs = gulp.series(
  cleanDocs,
  buildPug,
  buildStyle,
  minifyStyle,
  buildScript
)

const build = gulp.series(test, cleanDocs, buildDocs)

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

const start = gulp.series(build, connectDocs, openDocs)

/* ==================== 检测变更相关的 gulp 任务 ==================== */
const watchSource = () => {
  return watch('esm/**/*.js', gulp.series(lint, buildSource))
}

const watchApi = () => {
  return watch(['delegate.min.js', 'api/**/*.*'], gulp.series(buildDocs))
}

const watchDocs = () => {
  return watch('docs/**/*.*', {
    ignoreInitial: false
  }).pipe(reload())
}

const watchAll = gulp.parallel(watchSource, watchApi, watchDocs)

// 公开的 gulp 任务
module.exports.start = start
module.exports.clean = cleanDocs
module.exports.build = build
module.exports.lint = lint
module.exports.check = check
module.exports.test = test
module.exports.watch = watchAll

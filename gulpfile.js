const gulp = require('gulp');
const ts = require('gulp-typescript');
const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript:compile', () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest('dist'));
});

gulp.task('typescript:eslint', () => {
  return gulp.src(['src/*.ts', 'dist/**/*.ts'])
      .pipe(eslint({
        quiet: false,
        configFile: '.eslintrc.js'
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('javascript:prettier', () => {
  return gulp.src(['dist/*.js', 'dist/**/*.js'])
    .pipe(prettier(require('./.prettierrc.js')))
    .pipe(gulp.dest('./dist'));
});

gulp.task('javascript:eslint', () => {
  return gulp.src(['dist/*.js', 'dist/**/*.js'])
      .pipe(eslint({
        quiet: false,
        configFile: '.eslintrc.js'
      }))
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('default', gulp.series(
  'typescript:eslint',
  'typescript:compile',
  'javascript:prettier',
  'javascript:eslint',
));
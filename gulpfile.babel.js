// Packages
import gulp from 'gulp'
import del from 'del'
import babel from 'gulp-babel'
import help from 'gulp-task-listing'
import {crop as cropExt} from 'gulp-ext'
import cache from 'gulp-cached'

gulp.task('help', help)

gulp.task('compile', [
  'compile-lib',
  'compile-bin'
])
gulp.task('compile-lib', () =>
  gulp.src('lib/*.js')
  .pipe(cache('lib'))
  .pipe(babel())
  .pipe(gulp.dest('dist/lib')))

gulp.task('compile-bin', () =>
  gulp.src('bin/*.js')
  .pipe(cache('bin'))
  .pipe(babel())
  .pipe(cropExt())
  .pipe(gulp.dest('dist/bin')))

gulp.task('watch-lib', () => gulp.watch('lib/**/*.js', ['compile-lib']))
gulp.task('watch-bin', () => gulp.watch('bin/*', ['compile-bin']))
gulp.task('clean', () => del(['dist']))

gulp.task('watch', ['watch-lib', 'watch-bin'])
gulp.task('default', ['compile', 'watch'])

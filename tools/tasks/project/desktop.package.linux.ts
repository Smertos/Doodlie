import * as gulp from 'gulp';
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');

export = () => {
  let src = [
    'dist/dev/**/*'
  ];
  return gulp.src(src, { base: 'dist/dev' })
    .pipe(electron({ version: '1.4.12', platform: 'linux' }))
    .pipe(symdest('desktop/linux'));
};

import * as gulp from 'gulp';
import { relative, join } from 'path';
import Config from '../../config';
var newer = require('gulp-newer');

export = () => {
  let src = [
    'node_modules/@angular/**/*',
    'node_modules/rxjs/**/*',
    'node_modules/angulartics2/**/*',
    'node_modules/lodash/**/*',
    'node_modules/ng2-translate/**/*',
    'node_modules/@ngrx/**/*',
    'node_modules/pubsub-js/**/*',
    'node_modules/@angular2-material/**/*',
    'node_modules/dragula/**/*',
    'node_modules/ng2-dragula/**/*',
    'node_modules/angular2-notifications/**/*',
    'node_modules/angular2-perfect-scrollbar/**/*'
  ];

  src.push(...Config.NPM_DEPENDENCIES.map(x => relative(Config.PROJECT_ROOT, x.src)));

  return gulp.src(src, { base: 'node_modules' })
    .pipe(newer({
      dest: join(Config.APP_DEST + '/node_modules'), 
      map: function(path: String) { return path.replace('.ts', '.js').replace('.sccs', '.css'); }
    }))
    .pipe(gulp.dest(join(Config.APP_DEST + '/node_modules')));
};

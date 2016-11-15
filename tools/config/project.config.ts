import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Doodlie';

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,

      {src: `mdi/css/materialdesignicons.min.css`, inject: true, vendor: true},
      {src: `pouchdb/dist/pouchdb.min.js`, inject: true, vendor: true},
      {src: `pouchdb-quick-search/dist/pouchdb.quick-search.min.js`, inject: true, vendor: true}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,

      {src: `${this.CSS_SRC}/materialize.min.css`, inject: true, vendor: true},
    ];

    // Add other import paths to system.js config
    Object.assign(this.SYSTEM_CONFIG_DEV.paths, {
      'pubsub-js': 'node_modules/pubsub-js/src/pubsub.js'
    })
  }

}

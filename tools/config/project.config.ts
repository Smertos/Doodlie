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
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      {src: `${this.APP_BASE}node_modules/mdi/css/materialdesignicons.min.css`, inject: true, vendor: true},
      {src: `${this.CSS_SRC}/materialize.min.css`, inject: true, vendor: true},
      {src: `${this.APP_BASE}node_modules/pouchdb/dist/pouchdb.min.js`, inject: true, vendor: true},
      {src: `${this.APP_BASE}node_modules/pouchdb-quick-search/dist/pouchdb.quick-search.min.js`, inject: true, vendor: true}
    ];
  }

}

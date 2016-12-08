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
      {src: `pouchdb/dist/pouchdb.min.js`, inject: true, vendor: true},
      {src: `pouchdb-quick-search/dist/pouchdb.quick-search.min.js`, inject: true, vendor: true}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,

      {src: `${this.CSS_SRC}/materialdesignicons.min.css`, inject: true, vendor: true},
      {src: `${this.CSS_SRC}/roboto-fontface.css`, inject: true, vendor: true},

      //{src: `${this.CSS_SRC}/example.min.css`, inject: true, vendor: true},
    ];

    if(this.TARGET_DESKTOP) this.NPM_BASE = '../..' + this.NPM_BASE;

    // Development
    this.SYSTEM_CONFIG.paths['pubsub-js'] = `${this.NPM_BASE}pubsub-js/src/pubsub.js`
    this.SYSTEM_CONFIG.paths['@angular2-material/button'] = `${this.NPM_BASE}@angular2-material/button/button.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/card'] = `${this.NPM_BASE}@angular2-material/card/card.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/core'] = `${this.NPM_BASE}@angular2-material/core/core.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/grid-list'] = `${this.NPM_BASE}@angular2-material/grid-list/grid-list.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/input'] = `${this.NPM_BASE}@angular2-material/input/input.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/list'] = `${this.NPM_BASE}@angular2-material/list/list.umd.js`;
    this.SYSTEM_CONFIG.paths['@angular2-material/toolbar'] = `${this.NPM_BASE}@angular2-material/toolbar/toolbar.umd.js`;
    this.SYSTEM_CONFIG.paths['@ngrx/store-devtools'] = `${this.NPM_BASE}@ngrx/store-devtools/bundles/store-devtools.min.umd.js`;
    this.SYSTEM_CONFIG.paths['dragula'] = `${this.NPM_BASE}dragula/dist/dragula.min.js`;
    this.SYSTEM_CONFIG.paths['ng2-dragula/ng2-dragula'] = `${this.NPM_BASE}ng2-dragula/ng2-dragula.js`;
    this.SYSTEM_CONFIG_DEV.paths['ng2-dragula/ng2-dragula'] = `${this.NPM_BASE}ng2-dragula/ng2-dragula.js`;

    // Production
    this.SYSTEM_BUILDER_CONFIG.paths['pubsub-js'] = `pubsub-js/src/pubsub.js`
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/button'] = `@angular2-material/button/button.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/card'] = `@angular2-material/card/card.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/core'] = `@angular2-material/core/core.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/grid-list'] = `@angular2-material/grid-list/grid-list.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/input'] = `@angular2-material/input/input.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/list'] = `@angular2-material/list/list.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@angular2-material/toolbar'] = `@angular2-material/toolbar/toolbar.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['@ngrx/store-devtools'] = `@ngrx/store-devtools/bundles/store-devtools.min.umd.js`;
    this.SYSTEM_BUILDER_CONFIG.paths['dragula'] = `dragula/dist/dragula.min.js`;
    this.SYSTEM_BUILDER_CONFIG.packages['ng2-dragula/ng2-dragula'] = {
      main:`ng2-dragula.js`,
      defaultExtension: 'js'
    };

  }

}

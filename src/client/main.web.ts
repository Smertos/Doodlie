import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { WebModule } from './web.module';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .catch(console.error);
}

if (String('<%= ENV %>') === 'prod' || String('<%= TARGET_DESKTOP_BUILD %>') === 'true') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(WebModule);

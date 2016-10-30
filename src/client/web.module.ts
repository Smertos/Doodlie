// angular
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Http } from '@angular/http';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader } from 'ng2-translate';

// app
import { AppComponent } from './app/components/app.component';
import { BoardComponent } from './app/components/board/board.component';
import { routes } from './app/components/app.routes';

// feature modules
import { CoreModule } from './app/frameworks/core/core.module';
import { AnalyticsModule } from './app/frameworks/analytics/analytics.module';
import { multilingualReducer, MultilingualEffects } from './app/frameworks/i18n/index';
import { MultilingualModule, translateFactory } from './app/frameworks/i18n/multilingual.module';
import { DoodlieModule } from './app/frameworks/doodlie/doodlie.module';
import { boardListReducer, BoardListEffects } from './app/frameworks/doodlie/index';

// config
import { Config, WindowService, ConsoleService } from './app/frameworks/core/index';
Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;
if (String('<%= ENV %>') === 'dev') {
  // only output console logging in dev mode
  Config.DEBUG.LEVEL_4 = true;
}

import { AppConfig } from './app/frameworks/doodlie/services/app-config';
import { MultilingualService } from './app/frameworks/i18n/services/multilingual.service';

// custom i18n language support
MultilingualService.SUPPORTED_LANGUAGES = AppConfig.SUPPORTED_LANGUAGES;

let routerModule = RouterModule.forRoot(routes);

if (String('<%= TARGET_DESKTOP %>') === 'true') {
  Config.PLATFORM_TARGET = Config.PLATFORMS.DESKTOP;
  // desktop (electron) must use hash
  routerModule = RouterModule.forRoot(routes, {useHash: true});
}

declare var window, console;

// For AoT compilation to work:
export function win() {
  return window;
}
export function cons() {
  return console;
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule.forRoot([
      { provide: WindowService, useFactory: (win) },
      { provide: ConsoleService, useFactory: (cons) }
    ]),
    routerModule,
    AnalyticsModule,
    MultilingualModule.forRoot([{
      provide: TranslateLoader,
      deps: [Http],
      useFactory: (translateFactory)
    }]),
    DoodlieModule,
    StoreModule.provideStore({
      i18n: multilingualReducer,
      boards: boardListReducer
    }),
    EffectsModule.run(MultilingualEffects),
    EffectsModule.run(BoardListEffects)
  ],
  declarations: [
    AppComponent,
    BoardComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [AppComponent]
})

export class WebModule { }

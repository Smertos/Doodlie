import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StoreModule, combineReducers,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateLoader } from 'ng2-translate';

import { MdCoreModule } from '@angular2-material/core';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { AppComponent } from './app/app.component';
import { BoardsListComponent } from './app/wrapper/boards-list/boards-list.component';
import { BoardComponent } from './app/wrapper/board/board.component';
import { WrapperComponent } from './app/wrapper/wrapper.component';

import { BoardsService } from './app/services/boards.service';

import { appReducer, initialAppState } from './app/states/app.state';

import { BoardEffects } from './app/effects/board.effects';
import { ListEffects } from './app/effects/list.effects';

declare var window, console;

// For AoT compilation to work
export function win() {
  return window;
}
export function cons() {
  return console;
}

//Our module
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(appReducer, initialAppState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(BoardEffects),
    EffectsModule.run(ListEffects),
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
  ],
  declarations: [
    AppComponent,
    WrapperComponent,
    BoardsListComponent,
    BoardComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    },
    BoardsService
  ],
  bootstrap: [AppComponent]
})

export class WebModule { }

import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Http } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader } from 'ng2-translate';

import { AppComponent } from './app/app.component';
import { BoardsListComponent } from './app/wrapper/boards-list/boards-list.component';
import { BoardComponent } from './app/wrapper/board/board.component';
import { WrapperComponent } from './app/wrapper/wrapper.component';

import { BoardsService } from './app/services/boards.service';

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
    StoreModule.provideStore({
      /* reducerName: reducerFunc */
    }),
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

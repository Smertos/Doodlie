import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { StoreModule  } from '@ngrx/store';
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

//If you see an error 'Cannon find module', just ignore it. I'm to lazy to make types by myself :b
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AppComponent } from './app/components/app/app.component';
import { SidePanComponent } from './app/components/side-pan/side-pan.component';
import { BoardsListComponent } from './app/components/boards-list/boards-list.component';
import { BoardComponent } from './app/components/board/board.component';
import { ListComponent } from './app/components/list/list.component';
import { NewListComponent } from './app/components/new-list/new-list.component';
import { CardComponent } from './app/components/card/card.component';
import { NewCardComponent } from './app/components/new-card/new-card.component';
import { WrapperComponent } from './app/components/wrapper/wrapper.component';

import { FocusDirective } from './app/directives/focus.directive';

import { BoardsService } from './app/services/boards.service';

import { appReducer, initialAppState } from './app/states/app.state';

import { BoardEffects } from './app/effects/board.effects';
import { ListEffects } from './app/effects/list.effects';
import { CardEffects } from './app/effects/card.effects';

//Our module
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.provideStore(appReducer, initialAppState),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(BoardEffects),
    EffectsModule.run(ListEffects),
    EffectsModule.run(CardEffects),
    MdCoreModule,
    MdButtonModule,
    MdCardModule,
    MdGridListModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule,
    DragulaModule
  ],
  declarations: [
    AppComponent,
    SidePanComponent,
    WrapperComponent,
    BoardsListComponent,
    BoardComponent,
    ListComponent,
    NewListComponent,
    CardComponent,
    NewCardComponent,
    FocusDirective
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

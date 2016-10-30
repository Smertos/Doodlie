// angular
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'

// libs
import { StoreModule } from '@ngrx/store'

// app
import { BoardListService } from './services/board-list.service'
import { MultilingualModule } from '../i18n/multilingual.module'
import { IMultilingualState } from '../i18n/services/multilingual.service'

// state
export interface AppStoreI {
  i18n: IMultilingualState
  names: Array<string>
}

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MultilingualModule,
    StoreModule
  ],
  providers: [
    BoardListService
  ],
  exports: [
    MultilingualModule
  ]
})
export class DoodlieModule {

  constructor(@Optional() @SkipSelf() parentModule: DoodlieModule) {
    if (parentModule) {
      throw new Error('DoodlieModule already loaded. Import in root module only.')
    }
  }
}

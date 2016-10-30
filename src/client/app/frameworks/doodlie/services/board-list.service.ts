import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'

// libs
import { Store, ActionReducer, Action } from '@ngrx/store'
import { Effect, Actions } from '@ngrx/effects'

// app
import { Config } from '../../core/index'
import { Analytics, AnalyticsService } from '../../analytics/index'

// analytics
const CATEGORY: string = 'BoardList'

/**
 * ngrx setup start --
 */
interface IBoardListActions {
  INIT: string
  INITIALIZED: string
  INIT_FAILED: string
  ADD: string
  BOARD_ADDED: string
}

export const BOARD_LIST_ACTIONS: IBoardListActions = {
  INIT: `${CATEGORY}_INIT`,
  INITIALIZED: `${CATEGORY}_INITIALIZED`,
  INIT_FAILED: `${CATEGORY}_INIT_FAILED`,
  ADD: `${CATEGORY}_ADD`,
  BOARD_ADDED: `${CATEGORY}_BOARD_ADDED`
}

export function boardListReducerFn(state: any = [], action: Action) {
  switch (action.type) {
    case BOARD_LIST_ACTIONS.INITIALIZED:
      return [...action.payload]
    case BOARD_LIST_ACTIONS.BOARD_ADDED:
      return [...state, action.payload]
    default:
      return state
  }
}

export const boardListReducer: ActionReducer<any> = boardListReducerFn
/**
 * ngrx end --
 */

@Injectable()
export class BoardListService extends Analytics {

  constructor(public analytics: AnalyticsService, private store: Store<any>) {
    super(analytics)
    this.category = CATEGORY

    this.store.dispatch({ type: BOARD_LIST_ACTIONS.INIT })
  }
}

@Injectable()
export class BoardListEffects {

  constructor(private store: Store<any>, private actions$: Actions, private boardList: BoardListService, private http: Http) { }

}

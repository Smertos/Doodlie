declare var PouchDB: any;

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BoardsService } from '../services/boards.service';
import { BoardActions } from '../reducers/board.reducer';

import { Board } from '../models/board';

@Injectable()
export class BoardEffects {

  @Effect() init$ = this.actions$
    .ofType(BoardActions.INIT_BOARD)
    .switchMap(
      action => Observable
        .fromPromise(this.bService.getAllBoards())
        .map(
          boards => ({
            type: BoardActions.INITIALIZED_BOARD,
            payload: boards
          })
        ).catch(
          err => Observable.of({
            type: BoardActions.OPERATION_FAILED_BOARD,
            payload: Object.assign({ error: err }, action)
          })
        )
    );

  @Effect() add$ = this.actions$
    .ofType(BoardActions.ADD_BOARD)
    .switchMap(
      action => Observable
        .fromPromise(Board.createBoard(action.payload))
        .switchMap(
          resp =>
          Observable
            .fromPromise(this.bService.getBoard(resp.id))
            .map(
              (board: Board) => ({
                type: BoardActions.ADDED_BOARD,
                payload: board
              })
            ).catch(
              err => Observable.of({
                type: BoardActions.OPERATION_FAILED_BOARD,
                payload: Object.assign({ error: err }, action)
              })
            )
        )
    );

  @Effect() update$ = this.actions$
    .ofType(BoardActions.UPDATE_BOARD)
    .switchMap(
      (action: { type: string, payload: Board }) => Observable
        .fromPromise(action.payload.update())
        .map(
          () => ({ type: BoardActions.UPDATED_BOARD })
        ).catch(
          err => Observable.of({
            type: BoardActions.OPERATION_FAILED_BOARD,
            payload: Object.assign({ error: err }, action)
          })
        )
    );

  @Effect() delete$ = this.actions$
    .ofType(BoardActions.DELETE_BOARD)
    .switchMap(
      action => Observable
        .fromPromise(this.bService.getBoard(action.payload))
        .switchMap(
          (board: Board) => Observable
            .fromPromise(board.delete())
            .map(
              (resp: { id: string }) => ({
                type: BoardActions.DELETED_BOARD,
                payload: resp.id
              })
            ).catch(
              err => Observable.of({
                type: BoardActions.OPERATION_FAILED_BOARD,
                payload: Object.assign({ error: err }, action)
              })
          )
        )
    );

  constructor(private actions$: Actions, private bService: BoardsService) { }
}

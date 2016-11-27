declare var PouchDB: any;

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BoardsService } from '../services/boards.service';
import { BoardActions } from '../reducers/board.reducer';

@Injectable()
export class BoardsEffects {
    constructor(private actions$: Actions, private bService: BoardsService) { }

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
                    () => Observable.of({
                        type: BoardActions.OPERATION_FAILED_BOARD,
                        payload: action
                    })
                )
        );
}
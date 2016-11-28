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
import { ListActions } from '../reducers/list.reducer';

import { List } from '../models/list';

@Injectable()
export class ListEffects {
    constructor(private actions$: Actions, private bService: BoardsService) { }

    @Effect() init$ = this.actions$
        .ofType(ListActions.LOAD_BOARD_LIST)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getAllLists(action.payload))
                .map(
                    lists => ({ 
                        type: ListActions.LOADED_BOARD_LIST,
                        payload: lists.map(List.from)
                    })
                ).catch(
                    err => Observable.of({
                        type: ListActions.OPERATION_FAILED_LIST,
                        payload: Object.assign({ error: err }, action)
                    })
                )
        );

    @Effect() add$ = this.actions$
        .ofType(ListActions.ADD_LIST)
        .switchMap(
            action => {
                let promise = List.createList(action.payload.parent_id, action.payload._id);

                return Observable
                    .fromPromise(promise)
                    .switchMap(
                        (resp: { id: string }) =>
                            Observable
                                .fromPromise(this.bService.getList(resp.id))
                                .map(
                                    (list: List) => ({ 
                                        type: ListActions.ADDED_LIST,
                                        payload: List.from(list)
                                    })
                                ).catch(
                                    err => Observable.of({
                                        type: ListActions.OPERATION_FAILED_LIST,
                                        payload: Object.assign({ error: err }, action)
                                    })
                                )
                    )
                    
            }
        );

    @Effect() update$ = this.actions$
        .ofType(ListActions.UPDATE_LIST)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getList(action.payload))
                .map(List.from)
                .switchMap(
                    (list: List) => Observable
                        .fromPromise(list.update())
                        .map(
                            () => ({ 
                                type: ListActions.UPDATED_LIST
                            })
                        ).catch(
                            err => Observable.of({
                                type: ListActions.OPERATION_FAILED_LIST,
                                payload: Object.assign({ error: err }, action)
                            })
                        )
                )
        );

    @Effect() delete$ = this.actions$
        .ofType(ListActions.DELETE_LIST)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getList(action.payload))
                .map(List.from)
                .switchMap(
                    (list: List) => Observable
                        .fromPromise(list.delete())
                        .map(
                            (resp: { id: string }) => ({ 
                                type: ListActions.DELETED_LIST,
                                payload: resp.id
                            })
                        ).catch(
                            err => Observable.of({
                                type: ListActions.OPERATION_FAILED_LIST,
                                payload: Object.assign({ error: err }, action)
                            })
                        )
                )
        );
}
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
        .ofType(ListActions.INIT_LIST)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getAllLists())
                .map(
                    lists => ({ 
                        type: ListActions.INITIALIZED_LIST,
                        payload: lists
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
            action => Observable
                .fromPromise(List.createList(action.payload.parent_id, action.payload.name))
                .switchMap(
                    (resp: { id: string }) =>
                        Observable
                            .fromPromise(this.bService.getList(resp.id))
                            .map(
                                (list: List) => ({ 
                                    type: ListActions.ADDED_LIST,
                                    payload: list
                                })
                            ).catch(
                                err => Observable.of({
                                    type: ListActions.OPERATION_FAILED_LIST,
                                    payload: Object.assign({ error: err }, action)
                                })
                            )
                )
        );

    @Effect() update$ = this.actions$
        .ofType(ListActions.UPDATE_LIST)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getList(action.payload))
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
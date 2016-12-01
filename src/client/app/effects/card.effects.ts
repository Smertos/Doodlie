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
import { CardActions } from '../reducers/card.reducer';

import { Card } from '../models/card';

@Injectable()
export class CardEffects {
    constructor(private actions$: Actions, private bService: BoardsService) { }

    @Effect() init$ = this.actions$
        .ofType(CardActions.LOAD_LIST_CARD)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getAllCards(action.payload))
                .map(
                    cards => ({ 
                        type: CardActions.LOADED_LIST_CARD,
                        payload: cards
                    })
                ).catch(
                    err => Observable.of({
                        type: CardActions.OPERATION_FAILED_CARD,
                        payload: Object.assign({ error: err }, action)
                    })
                )
        );

    @Effect() add$ = this.actions$
        .ofType(CardActions.ADD_CARD)
        .switchMap(
            action => Observable
                .fromPromise(Card.createCard(action.payload.parent_id, action.payload.title))
                .switchMap(
                    (resp: { id: string }) =>
                        Observable
                            .fromPromise(this.bService.getCard(resp.id))
                            .map(
                                (card: Card) => ({ 
                                    type: CardActions.ADDED_CARD,
                                    payload: card
                                })
                            ).catch(
                                err => Observable.of({
                                    type: CardActions.OPERATION_FAILED_CARD,
                                    payload: Object.assign({ error: err }, action)
                                })
                            )
                )
        );

    @Effect() update$ = this.actions$
        .ofType(CardActions.UPDATE_CARD)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getCard(action.payload))
                .switchMap(
                    (card: Card) => Observable
                        .fromPromise(card.update())
                        .map(
                            () => ({ 
                                type: CardActions.UPDATED_CARD
                            })
                        ).catch(
                            err => Observable.of({
                                type: CardActions.OPERATION_FAILED_CARD,
                                payload: Object.assign({ error: err }, action)
                            })
                        )
                )
        );

    @Effect() delete$ = this.actions$
        .ofType(CardActions.DELETE_CARD)
        .switchMap(
            action => Observable
                .fromPromise(this.bService.getCard(action.payload))
                .switchMap(
                    (card: Card) => Observable
                        .fromPromise(card.delete())
                        .map(
                            (resp: { id: string }) => ({ 
                                type: CardActions.DELETED_CARD,
                                payload: resp.id
                            })
                        ).catch(
                            err => Observable.of({
                                type: CardActions.OPERATION_FAILED_CARD,
                                payload: Object.assign({ error: err }, action)
                            })
                        )
                )
        );
}
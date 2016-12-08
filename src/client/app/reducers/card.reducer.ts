import { Action } from '@ngrx/store';
import { ICardState } from '../states/card.state';

export * from '../models/board';

export interface ICardActions {
    ADD_CARD: string,
    ADDED_CARD: string,
    INIT_CARD: string,
    INITIALIZED_CARD: string,
    UPDATE_CARD: string,
    UPDATED_CARD: string,
    DELETE_CARD: string,
    DELETED_CARD: string,
    OPERATION_FAILED_CARD: string
} 

export const CardActions: ICardActions = {
    ADD_CARD: 'ADD_CARD',
    ADDED_CARD: 'ADDED_CARD',
    INIT_CARD: 'INIT_CARD',
    INITIALIZED_CARD: 'INITIALIZED_CARD',
    UPDATE_CARD: 'UPDATE_CARD',
    UPDATED_CARD: 'UPDATED_CARD',
    DELETE_CARD: 'DELETE_CARD',
    DELETED_CARD: 'DELETED_CARD',
    OPERATION_FAILED_CARD: 'OPERATION_FAILED_CARD'
};

export const initialCardState: ICardState = {
    cards: []
};

export function card(state: ICardState = initialCardState, { type, payload } : Action) : ICardState {
    switch (type) {

        case CardActions.INITIALIZED_CARD:
            return Object.assign({}, state, { cards: payload });

        case CardActions.ADDED_CARD:
            return Object.assign({}, state, { cards: state.cards.concat(payload) });

        case CardActions.DELETED_CARD:
            return Object.assign({}, state, { cards: state.cards.filter(l => l._id != payload) });

        case CardActions.OPERATION_FAILED_CARD:
            console.error('Action execution failed', payload)
            return state;

        case CardActions.INIT_CARD:
        case CardActions.ADD_CARD:
        case CardActions.UPDATE_CARD:
        case CardActions.UPDATED_CARD:
        case CardActions.DELETE_CARD:
        default:
            return state;
    }
};
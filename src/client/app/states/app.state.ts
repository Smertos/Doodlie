import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { IBoardState } from './board.state';
import { IListState } from './list.state';
import { ICardState } from './card.state';

import { board, initialBoardState } from '../reducers/board.reducer';
import { list, initialListState } from '../reducers/list.reducer';
import { card, initialCardState } from '../reducers/card.reducer';

import { Board } from '../models/board';
import { List } from '../models/list';
import { Card } from '../models/card';
import { Tag } from '../models/tag';

export interface IAppState {
    board: IBoardState,
    list: IListState,
    card: ICardState
}

const reducers = { board, list, card };

const reducer: ActionReducer<IAppState> = combineReducers(reducers);

export const initialAppState: IAppState = {
    board: initialBoardState,
    list: initialListState,
    card: initialCardState
};

export function appReducer(state: IAppState = initialAppState, action: Action) {
    return reducer(state, action);
}
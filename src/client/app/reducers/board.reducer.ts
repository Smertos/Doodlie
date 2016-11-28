import { Action } from '@ngrx/store';
import { Board, IBoard } from '../models/board';
import { IBoardState } from '../states/board.state';

export * from '../models/board';

export interface IBoardActions {
    ADD_BOARD: string,
    ADDED_BOARD: string,
    INIT_BOARD: string,
    INITIALIZED_BOARD: string,
    UPDATE_BOARD: string,
    UPDATED_BOARD: string,
    DELETE_BOARD: string,
    DELETED_BOARD: string,
    OPERATION_FAILED_BOARD: string
} 

export const BoardActions: IBoardActions = {
    ADD_BOARD: 'ADD_BOARD',
    ADDED_BOARD: 'ADDED_BOARD',
    INIT_BOARD: 'INIT_BOARD',
    INITIALIZED_BOARD: 'INITIALIZED_BOARD',
    UPDATE_BOARD: 'UPDATE_BOARD',
    UPDATED_BOARD: 'UPDATED_BOARD',
    DELETE_BOARD: 'DELETE_BOARD',
    DELETED_BOARD: 'DELETED_BOARD',
    OPERATION_FAILED_BOARD: 'OPERATION_FAILED_BOARD'
};

export const initialBoardState: IBoardState = {
    boards: []
};

export function board(state: IBoardState = initialBoardState, { type, payload } : Action) : IBoardState {
    console.log('state', state);
    console.log('payload', payload);
    switch (type) {

        case BoardActions.INITIALIZED_BOARD:
            return Object.assign({}, state, { boards: payload });

        case BoardActions.ADDED_BOARD:
            return Object.assign({}, state, { boards: state.boards.concat(payload) });

        case BoardActions.DELETED_BOARD:
            return Object.assign({}, state, { boards: state.boards.filter(b => b._id != payload) });

        case BoardActions.OPERATION_FAILED_BOARD:
            console.error('Action execution failed', payload)
            return state;

        case BoardActions.INIT_BOARD:
        case BoardActions.ADD_BOARD:
        case BoardActions.UPDATE_BOARD:
        case BoardActions.UPDATED_BOARD:
        case BoardActions.DELETE_BOARD:
        default:
            return state;
    }
};
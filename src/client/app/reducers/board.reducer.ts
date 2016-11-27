import { Action } from '@ngrx/store';
import { Board, IBoard } from '../models/board';
import { BoardsState } from '../states/board.state';

export * from '../models/board';

export interface IBoardActions {
    ADD_BOARD: string,
    INIT_BOARD: string,
    INITIALIZED_BOARD: string,
    UPDATE_BOARD: string,
    DELETE_BOARD: string,
    OPERATION_FAILED_BOARD: string
} 

export const BoardActions: IBoardActions = {
    ADD_BOARD: 'ADD_BOARD',
    INIT_BOARD: 'INIT_BOARD',
    INITIALIZED_BOARD: 'INITIALIZED_BOARD',
    UPDATE_BOARD: 'UPDATE_BOARD',
    DELETE_BOARD: 'DELETE_BOARD',
    OPERATION_FAILED_BOARD: 'OPERATION_FAILED_BOARD'
}



const initialState: BoardsState = {
    boards: []
};

export function boards(state: BoardsState = initialState, { type, payload } : Action) : BoardsState {
    switch (type) {

        case BoardActions.INITIALIZED_BOARD:
            return Object.assign({}, state, { boards: state.boards.concat(payload) });

        case BoardActions.ADD_BOARD:
            return Object.assign({}, state, { boards: state.boards.concat(Board.createBoard(payload)) });

        case BoardActions.UPDATE_BOARD:
            return Object.assign({}, state, { boards: state.boards.map(b => b._id == payload._id ? Object.assign({}, b, payload) : b) });

        case BoardActions.DELETE_BOARD:
            return Object.assign({}, state, { boards: state.boards.filter(b => b._id != payload._id) });

        case BoardActions.OPERATION_FAILED_BOARD:
            console.error('Action execution failed', payload)
            return state;

        case BoardActions.INIT_BOARD:
        default:
            return state;
    }
};
import { Action } from '@ngrx/store';
import { IListState } from '../states/list.state';

export * from '../models/board';

export interface IListActions {
    ADD_LIST: string,
    ADDED_LIST: string,
    INIT_LIST: string,
    INITIALIZED_LIST: string,
    UPDATE_LIST: string,
    UPDATED_LIST: string,
    DELETE_LIST: string,
    DELETED_LIST: string,
    OPERATION_FAILED_LIST: string
} 

export const ListActions: IListActions = {
    ADD_LIST: 'ADD_LIST',
    ADDED_LIST: 'ADDED_LIST',
    INIT_LIST: 'INIT_LIST',
    INITIALIZED_LIST: 'INITIALIZED_LIST',
    UPDATE_LIST: 'UPDATE_LIST',
    UPDATED_LIST: 'UPDATED_LIST',
    DELETE_LIST: 'DELETE_LIST',
    DELETED_LIST: 'DELETED_LIST',
    OPERATION_FAILED_LIST: 'OPERATION_FAILED_LIST'
};

export const initialListState: IListState = {
    lists: []
};

export function list(state: IListState = initialListState, { type, payload } : Action) : IListState {
    switch (type) {

        case ListActions.INITIALIZED_LIST:
            return Object.assign({}, state, { lists: payload });

        case ListActions.ADDED_LIST:
            return Object.assign({}, state, { lists: state.lists.concat(payload) });

        case ListActions.DELETED_LIST:
            return Object.assign({}, state, { lists: state.lists.filter(l => l._id != payload) });

        case ListActions.OPERATION_FAILED_LIST:
            console.error('Action execution failed', payload)
            return state;

        case ListActions.INIT_LIST:
        case ListActions.ADD_LIST:
        case ListActions.UPDATE_LIST:
        case ListActions.UPDATED_LIST:
        case ListActions.DELETE_LIST:
        default:
            return state;
    }
};
import { Board } from '../models/board';

export interface IBoardState {
    boards: Array<Board>;
}

export const initialState: IBoardState = {
    boards: <Array<Board>>[]
}
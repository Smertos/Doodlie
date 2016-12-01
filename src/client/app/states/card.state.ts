import { Card } from '../models/card';

export interface ICardState {
    cards: Array<Card>;
}

export const initialState: ICardState = {
    cards: <Array<Card>>[]
}
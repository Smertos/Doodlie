import { Observable } from 'rxjs/Observable';
import { List } from '../models/list';

export interface IListState {
    lists: Array<List>;
}

export const initialState: IListState = {
    lists: <Array<List>>[]
}
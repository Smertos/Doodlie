import { List } from './list';

export interface Board {
    _id: string;
    name: string;
    lists: List[];
}
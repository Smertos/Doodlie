import { IList, List } from './list';

export interface IBoard {
    _id: string;
    name: string;
    lists: IList[];
}

export class Board implements IBoard {

    _id: string;
    name: string;
    lists: List[];

    constructor(_id: string, name: string) {
        this._id = _id;
        this.name = name;
        this.lists = [];
    }

    static createBoard(name: string) {
        return new Board('board-' + Math.random().toString(36).replace(/[^a-z]+/g, ''), name);
    }

    createList(name: string) {
        var newList = List.createList(name);
        this.lists.push(newList);
    }

    addList(list: List) {
        if(typeof list != 'undefined')
            this.lists.push(list);
    }
}
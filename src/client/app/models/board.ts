declare var PouchDB: any;

import { IList, List } from './list';
import { randString } from '../utils';

let db = new PouchDB('boards');

export interface IBoard {
    _id: string;
    name: string;
    list_ids: string[];
    createTime: number;
}

export class Board implements IBoard {

    _id: string;
    _rev: string;
    name: string;
    list_ids: string[];
    createTime: number;

    constructor(_id: string, name: string, list_ids: string[] = [], createTime: number = Date.now(), _rev: string = undefined) {
        this._id = _id;
        this._rev = _rev;
        this.name = name;
        this.list_ids = list_ids;
        this.createTime = createTime;
    }

    static createBoard(name: string) {
        let newBoard: Board = new Board('board-' + randString(), name);
        db.put(newBoard);
        return newBoard;
    }

    static from(b: { _id: string, name: string, list_ids: string[], createTime: number }) {
        return new Board(b._id, b.name, b.list_ids, b.createTime);
    }

    createList(name: string) {
        var newList = List.createList(this._id, name);
        this.list_ids.push(newList._id);
        return newList;
    }

    addList(list: List) {
        if(typeof list != 'undefined')
            this.list_ids.push(list._id);
        return list
    }
}
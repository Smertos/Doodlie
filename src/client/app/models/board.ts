declare var PouchDB: any;

import { List } from './list';
import { randString } from '../utils';

let db = new PouchDB('boards');

export interface IBoard {
    _id: string;
    name: string;
    createTime: number;
    _rev: string;
}

export class Board implements IBoard {

    _id: string;
    name: string;
    createTime: number;
    _rev: string;

    static createBoard(name: string): Promise<any> {
        let newBoard: Board = new Board('board-' + randString(), name);
        return db.put(newBoard);
    }

    static from(b: { _id: string, name: string, createTime: number, _rev: string }): Board {
        return new Board(b._id, b.name, b.createTime, b._rev);
    }

    static getDummy(): Board { return new Board('null', 'Dummy Board'); }

    constructor(_id: string, name: string, createTime: number = Date.now(), _rev: string = undefined) {
        this._id = _id;
        this.name = name;
        this.createTime = createTime;
        this._rev = _rev;
    }

    update(): Promise<any> {
        return db.put(this);
    }

    delete(): Promise<any> {
        return db.remove(this._id, this._rev);
    }

    createList(name: string): Promise<any> {
        return List.createList(this._id, name);
    }
}

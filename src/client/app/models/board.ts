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

    static createBoard(name: string): Promise<any> {
        let newBoard: Board = new Board('board-' + randString(), name);
        return db.put(newBoard);
    }

    static from(b: { _id: string, name: string, list_ids: string[], createTime: number, _rev: string }) {
        return new Board(b._id, b.name, b.list_ids, b.createTime, b._rev);
    }

    update() {
        return db.put(this);
    }

    delete() {
        return db.remove(this._id, this._rev);
    }

    createList(name: string) {
        return List
            .createList(this._id, name)
            .then(
                (res: { id: string }) => this.list_ids.push(res.id)
            ).then(() => this.update());
    }

    addList(list: List) {
        if(typeof list != 'undefined')
            this.list_ids.push(list._id);
        return list
    }
}
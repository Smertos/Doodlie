declare var PouchDB: any;

import { Card } from './card';
import { randString } from '../utils';

let db = new PouchDB('lists');

export class IList {
    parent_id: string;
    _id: string;
    _rev: string;
    name: string;
    createTime: number;
}

export class List implements IList {

    parent_id: string;
    _id: string;
    _rev: string;
    name: string;
    createTime: number;

    static createList(parent_id: string, name: string): Promise<any>  {
        let newList: List = new List(parent_id, 'list-' + randString(), name);
        return db.put(newList);
    }

    static from(l: { parent_id: string, _id: string, name: string, createTime: number, _rev: string }): List {
        return new List(l.parent_id, l._id, l.name, l.createTime, l._rev);
    }

    static getDummy(): List { return new List('null', 'null','Dummy List'); }

    constructor(parent_id: string, _id: string, name: string, createTime: number = Date.now(), _rev: string = undefined) {
        this.parent_id = parent_id;
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

    createCard(name: string): Promise<any> {
      return Card.createCard(this._id, name);
    }
}

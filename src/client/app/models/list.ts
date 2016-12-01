declare var PouchDB: any;

import { ICard, Card } from './card';
import { randString } from '../utils';

let db = new PouchDB('lists');

export class IList {
    parent_id: string;
    _id: string;
    _rev: string;
    name: string;
    card_ids: string[];
    createTime: number;
}

export class List implements IList {

    parent_id: string;
    _id: string;
    _rev: string;
    name: string;
    card_ids: string[];
    createTime: number;

    constructor(parent_id: string, _id: string, name: string, card_ids: string[] = [], createTime: number = Date.now(), _rev: string = undefined) {
        this.parent_id = parent_id;
        this._id = _id;
        this.name = name;
        this.card_ids = card_ids;
    }

    static createList(parent_id: string, name: string): Promise<any>  {
        let newList: List = new List(parent_id, 'list-' + randString(), name);
        return db.put(newList);
    }

    static from(l: { parent_id: string, _id: string, name: string, card_ids: string[], createTime: number, _rev: string }) {
        return new List(l.parent_id, l._id, l.name, l.card_ids, l.createTime, l._rev);
    }

    update() {
        return db.put(this);
    }

    delete() {
        return db.remove(this._id, this._rev);
    }

    createCard(name: string, desc: string = '') {

        return Card.createCard(this._id, name)
                .then(
                    (res: { id: string }) => this.card_ids.push(res.id)
                ).then(() => this.update());
    }

    addCard(card: Card) {
        if(typeof card != 'undefined')
            this.card_ids.push(card._id);
        return this;
    }
}
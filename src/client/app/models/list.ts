declare var PouchDB: any;

import { ICard, Card } from './card';
import { randString } from '../utils';

let db = new PouchDB('lists');

export class IList {
    parent_id: string;
    _id: string;
    name: string;
    card_ids: string[];
}

export class List implements IList {

    parent_id: string;
    _id: string;
    name: string;
    card_ids: string[];

    constructor(parent_id: string, _id: string, name: string, card_ids: string[] = []) {
        this.parent_id = parent_id;
        this._id = _id;
        this.name = name;
        this.card_ids = card_ids;
    }

    static createList(parent_id: string, name: string) {
        let newList: List = new List(parent_id, 'list-' + randString(), name);
        db.put(newList);
        return newList;
    }

    static from(l: { parent_id: string, _id: string, name: string, card_ids: string[] }) {
        return new List(l.parent_id, l._id, l.name, l.card_ids);
    }

    createCard(name: string, desc: string = '') {
        var newCard = Card.createCard(this._id, name, desc);
        this.card_ids.push(newCard._id);
    }

    addCard(card: Card) {
        if(typeof card != 'undefined')
            this.card_ids.push(card._id);
    }
}
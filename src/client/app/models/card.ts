declare var PouchDB: any;

import { Tag } from './tag';
import { randString } from '../utils';

let db = new PouchDB('cards');

export interface ICard {
    parent_id: string;
    _id: string;
    title: string;
    description: string;
    until: Date;
    tags_ids: string[];
}

export class Card implements ICard {

    parent_id: string;    
    _id: string;
    title: string;
    description: string;
    until: Date;
    tags_ids: string[];

    constructor(parent_id:string, _id: string, title: string, desc: string, until: Date = null, tags_ids: string[] = []) {
        this.parent_id = parent_id;
        this._id = _id;
        this.title = title;
        this.description = desc;
        this.until = until;
        this.tags_ids = tags_ids;

        db.put(this);
    }

    static createCard(parent_id: string, name: string, desc: string, until: Date = null, tags_ids: string[] = []) {
        let newCard: Card = new Card(parent_id, 'card-' + randString(), name, desc, until, tags_ids);
        db.put(newCard);
        return newCard;
    }

    static from(c: { parent_id: string, _id: string, title: string, description: string, until: Date, tags_ids: string[] }) {
        return new Card(c.parent_id, c._id, c.title, c.description, c.until, c.tags_ids);
    }

    appendTag(tag: Tag) {
        if(typeof tag != 'undefined')
            this.tags_ids.push(tag._id);
    }

}
declare var PouchDB: any;

import { Tag } from './tag';
import { randString } from '../utils';

let db = new PouchDB('cards');

export interface ICard {
    parent_id: string;
    _id: string;
    title: string;
    description: string;
    tags_ids: string[];
    createdAt: number;
    until: number;
    _rev: string;
}

export class Card implements ICard {

    parent_id: string;
    _id: string;
    title: string;
    description: string;
    tags_ids: string[];
    createdAt: number;
    until: number;
    _rev: string;

    static createCard(parent_id: string, title: string): Promise<any>  {
        let newCard: Card = new Card(parent_id, 'card-' + randString(), title);
        return db.put(newCard);
    }

    static from(c: { parent_id: string, _id: string, title: string, description: string, tags_ids: string[], until: number, createdAt: number, _rev: string }): Card {
        return new Card(c.parent_id, c._id, c.title, c.description, c.tags_ids, c.until, c.createdAt, c._rev);
    }

    constructor(parent_id:string, _id: string, title: string, description: string = '', tags_ids: string[] = [], until: number = -1, createdAt: number = Date.now(), _rev: string = undefined) {
        this.parent_id = parent_id;
        this._id = _id;
        this.title = title;
        this.description = description;
        this.tags_ids = tags_ids;
        this.until = until;
        this.createdAt = createdAt;
        this._rev = _rev;
    }

    update(): Promise<any> {
        return db.put(this);
    }

    delete(): Promise<any> {
        return db.remove(this._id, this._rev);
    }

    appendTag(tag: Tag) {
        if(typeof tag !== 'undefined')
            this.tags_ids.push(tag._id);
        return this;
    }

}

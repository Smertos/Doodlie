declare var PouchDB: any;

import { randString } from '../utils';

let db = new PouchDB('tags');

export interface ITag {
    _id: string;
    name: string;
    colorCode: string;
}

export class Tag implements ITag {

    _id: string;
    name: string;
    colorCode: string;

    constructor(_id: string, name: string, colorCode: string) {
        this._id = _id;
        this.name = name;
        this.colorCode = colorCode;

        db.put(this);
    }

    static createTag(name: string, colorCode: string) {
        let newTag: Tag = new Tag(randString(), name, colorCode);
        db.put(newTag);
        return newTag;
    }

    static from(t: { _id: string, name: string, colorCode: string }) {
        return new Tag(t._id, t.name, t.colorCode);
    }
}
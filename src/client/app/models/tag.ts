declare var PouchDB: any;

import { randString } from '../utils';

let db = new PouchDB('tags');

export interface ITag {
    _id: string;
    name: string;
    colorCode: string;
    createdAt: number;
}

export class Tag implements ITag {

    _id: string;
    name: string;
    colorCode: string;
    createdAt: number;

    static createTag(name: string, colorCode: string): Promise<any> {
        let newTag: Tag = new Tag(randString(), name, colorCode);
        return db.put(newTag);
    }

    static from(t: { _id: string, name: string, colorCode: string, createdAt: number }): Tag {
        return new Tag(t._id, t.name, t.colorCode,t.createdAt);
    }

    constructor(_id: string, name: string, colorCode: string, createdAt: number = Date.now()) {
        this._id = _id;
        this.name = name;
        this.colorCode = colorCode;
        this.createdAt = createdAt;
    }
}

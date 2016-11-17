import { Tag } from './tag';

export interface ICard {
    _id: string;
    title: string;
    description: string;
    until: Date;
    tags: Tag[];
}

export class Card implements ICard {
    
    _id: string;
    title: string;
    description: string;
    until: Date;
    tags: Tag[];

    constructor(_id: string, title: string, desc: string, until: Date = null, tags: Tag[] = []) {
        this._id = _id;
        this.title = title;
        this.description = desc;
        this.until = until;
        this.tags = tags;
    }

    static createCard(name: string, desc: string, until: Date = null, tags: Tag[] = []) {
        return new Card('card-' + Math.random().toString(36).replace(/[^a-z]+/g, ''), name, desc, until, tags);
    }

    appendTag(tag: Tag) {
        if(typeof tag != 'undefined')
            this.tags.push(tag);
    }

}
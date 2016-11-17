import { ICard, Card } from './card';

export class IList {
    _id: string;
    name: string;
    cards: ICard[];
}

export class List implements IList {

    _id: string;
    name: string;
    cards: Card[];

    constructor(_id: string, name: string, cards: Card[] = []) {
        this._id = _id;
        this.name = name;
        this.cards = cards;
    }

    static createList(name: string) {
        return new List('list-' + Math.random().toString(36).replace(/[^a-z]+/g, ''), name);
    }

    createCard(name: string, desc: string) {
        var newCard = Card.createCard(name, desc);
        this.cards.push(newCard);
    }

    addCard(card: Card) {
        if(typeof card != 'undefined')
            this.cards.push(card);
    }
}
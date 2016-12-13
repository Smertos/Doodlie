declare var PouchDB: any;

import { Injectable, EventEmitter } from '@angular/core';
import { Board } from '../models/board';
import { List } from '../models/list';
import { Card } from '../models/card';
import { Tag } from '../models/tag';

@Injectable()
export class BoardsService {

  boardsDB: any;
  listsDB: any;
  cardsDB: any;
  tagsDB: any;

  constructor() {
    this.boardsDB = new PouchDB('boards');
    this.listsDB = new PouchDB('lists');
    this.cardsDB = new PouchDB('cards');
    this.tagsDB = new PouchDB('tags');
  }

  getAllBoards(): Promise<Board[]> {
    return this.retrieveAllBoards();
  }

  getAllLists(board_id: string = '-1'): Promise<List[]> {
    return this.retrieveAllLists(board_id);
  }

  getAllCards(list_id: string = '-1'): Promise<Card[]> {
    return this.retrieveAllCards(list_id);
  }

  getBoard(_id: string): Promise<Board> {
    return this.boardsDB
              .get(_id)
              .then(doc => Board.from(doc))
              .catch(console.error);
  }

  getList(_id: string): Promise<List> {
    return this.listsDB
              .get(_id)
              .then(doc => List.from(doc))
              .catch(console.error);
  }

  getCard(_id: string): Promise<Card> {
    return this.cardsDB
              .get(_id)
              .then(doc => Card.from(doc))
              .catch(console.error);
  }

  getTag(_id: string): Promise<Tag> {
    return this.tagsDB
              .get(_id)
              .then(doc => Tag.from(doc))
              .catch(console.error);
  }

  private retrieveAllBoards() {
    return this.boardsDB.allDocs({
      include_docs: true
    })
    .then(res => res.rows.map(e => Board.from(e.doc)))
    .catch(console.error);
  }

  private retrieveAllLists(board_id: string) {
    if(board_id !== '-1') {
      return this.listsDB.search({
        query: board_id,
        fields: ['parent_id'],
        include_docs: true
      })
      .then(res => res.rows.map(e => List.from(e.doc)))
      .catch(err => console.error(err));
    } else {
      return this.listsDB.allDocs({
        include_docs: true
      })
      .then(res => res.rows.map(e => List.from(e.doc)))
      .catch(err => console.error(err));
    }
  }

  private retrieveAllCards(list_id: string) {
    if(list_id !== '-1') {
      return this.cardsDB.search({
        query: list_id,
        fields: ['parent_id'],
        include_docs: true
      })
      .then(res => res.rows.map(e => Card.from(e.doc)))
      .catch(err => console.error(err));
    } else {
      return this.cardsDB.allDocs({
        include_docs: true
      })
      .then(res => res.rows.map(e => Card.from(e.doc)))
      .catch(err => console.error(err));
    }
  }

}

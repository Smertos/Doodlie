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
  
  updateCallbacks: Function[] = [];

  constructor() {
    this.boardsDB = new PouchDB('boards');
    this.listsDB = new PouchDB('lists');
    this.cardsDB = new PouchDB('cards');
    this.tagsDB = new PouchDB('tags');

    this.retrieveAllBoards(boards => 
        this.updateCallbacks.forEach(c => c(boards))
    );

    PubSub.subscribe('service.boards.update', (en, b: Board) => {
      this.boardsDB.get(b._id).then(d => this.boardsDB.put(Object.assign(b, { _rev: d._rev })));
    });
  }

  getAllBoards(): Promise<Board[]> {
    return new Promise(res => this.retrieveAllBoards(res));
  }

  getAllLists(board_id: string): Promise<List[]> {
    return new Promise(res => this.retrieveAllLists(board_id, res));
  }

  getAllCards(list_id: string): Promise<Card[]> {
    return new Promise(res => this.retrieveAllCards(list_id, res));
  }

  getBoard(_id: string): Promise<Board> {
    return this.boardsDB.get(_id);
  }

  subscribe(callback: Function) {
    this.updateCallbacks.push(callback);
  }

  private retrieveAllBoards(callback: Function) {
    return this.boardsDB.allDocs({
      include_docs: true
    })
    .then(res => callback(res.rows.map(e => Board.from(e.doc))))
    .catch(err => console.error(err));
  }

  private retrieveAllLists(board_id: string, callback: Function) {
    return this.listsDB.search({
      query: board_id,
      fields: ['parent_id'],
      include_docs: true
    })
    .then(res => callback(res.rows.map(e => List.from(e.doc))))
    .catch(err => console.error(err));
  }

  private retrieveAllCards(list_id: string, callback: Function) {
    return this.cardsDB.search({
      query: list_id,
      fields: ['parent_id'],
      include_docs: true
    })
    .then(res => callback(res.rows.map(e => Card.from(e.doc))))
    .catch(err => console.error(err));
  }

}

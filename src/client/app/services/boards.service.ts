declare var PouchDB: any;

import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable()
export class BoardsService {

  db: any;
  boards: Board[] = [];
  updateCallbacks: Function[] = [];

  constructor() {
    this.db = new PouchDB('boards');

    this.retrieveAllBoards(boards => 
        this.updateCallbacks.forEach(c => c(boards))
    );

    //Kinda hacky way of testing services :-)
    window.createBoard = this.newBoard.bind(this);
   }

  getBoards(): Board[] {
    return this.boards;
  }

  newBoard(name: string) {
    console.log(`Creating new board '${name}'`);
    let newBoard: Board = Board.createBoard(name);

    return this.db.put(newBoard).then(() => 
      this.retrieveAllBoards(boards => 
        this.updateCallbacks.forEach(c => c(boards))
      )
    );
  }

  subscribe(callback: Function) {
    this.updateCallbacks.push(callback);
  }

  private retrieveAllBoards(callback: Function) {
    return this.db.allDocs({ include_docs: true })
                  .then(res => this.boards = res.rows.map(e => e.doc))
                  .then(res => callback(this.boards));
  }

}

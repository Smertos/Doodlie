declare var PouchDB: any;

import { Injectable } from '@angular/core';
import { Board } from '../models/board';

@Injectable()
export class BoardsService {

  db: any;

  constructor() {
    this.db = new PouchDB('boards');
   }

  getBoards(): Board[] {
    return [{
      _id: '0',
      name: 'College Project',
      lists: null
    }, {
      _id: '1',
      name: 'Homework',
      lists: null
    }, {
      _id: '2',
      name: 'Jojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojojov',
      lists: null
    }];
  }

  getBoardsLong(): Promise<Board[]> {
    return new Promise<Board[]>(res => setTimeout(res, 1000)).then(() => this.getBoards());
  }

  newBoard(name: string) {
    console.log(`Creating new board '${name}'`);
  }

}

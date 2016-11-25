import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';
import { List } from '../../models/list';

@Component({
  moduleId:       module.id,
  selector:       'app-board',
  templateUrl:    'board.component.html',
  styleUrls:      ['board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {

  @Output() closeBoardPanel = new EventEmitter(true);
  board: Board;
  lists: List[] = [];
  newListName: string = '';

  constructor(private bService: BoardsService) { }

  ngOnInit() {
    //TODO: Create BaseComponent class extending Angular's Component and implement global promisable events in it with pubsub
    PubSub.subscribe('board.loadBoard', (ename: string, b: Board) => {
      this.board = b;

      this.bService.getAllLists(b._id)
        .then(lists => this.lists = lists);
    });
  }

  createList() {
    console.log('New list name', this.newListName);
    console.log('Board', this.board);
    this.board.createList(this.newListName);
  }
}

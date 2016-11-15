import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'pubsub-js';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';

@Component({
  moduleId:       module.id,
  selector:       'app-boards-list',
  templateUrl:    'boards-list.component.html',
  styleUrls:      ['boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  @Output() openBoardPanel = new EventEmitter(true);
  boards: Board[] = [];

  constructor(private bService: BoardsService) { }

  ngOnInit() { 
    this.boards = this.bService.getBoards();
  }

  newBoard(event: Event) {
    event.stopPropagation();
    this.bService.newBoard('kek');

    PubSub.publish('wrapper.boardOpen', {});
    PubSub.publish('board.loadBoard', { board: { name: 'New Board' } });
  }

  openBoard(event: Event, name: string) {
    event.stopPropagation();
    console.log(`Opened board '${name}'`);

    PubSub.publish('wrapper.boardOpen', {});
    PubSub.publish('board.loadBoard', { board: { name } });
  }

}

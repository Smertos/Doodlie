import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import 'pubsub-js';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';

let _ = require('lodash');

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
    this.bService.subscribe(boards => this.boards = _.sortBy(boards, ['createTime', 'name']));
    this.bService.getAllBoards().then(boards => this.boards = _.sortBy(boards, ['createTime', 'name']));

    PubSub.subscribe('app.promptSubmit', (en, { text: text }) => {
      let board: Board = this.bService.newBoard(text);

      //PubSub.publish('wrapper.boardOpen', {});
      PubSub.publish('board.loadBoard', board);
    });
  }

  newBoard(event: Event) {
    event.stopPropagation();
    
    PubSub.publish('app.openPrompt', {});
  }

  openBoard(event: Event, name: string) {
    event.stopPropagation();
    console.log(`Opened board '${name}'`);

    PubSub.publish('board.loadBoard', this.boards.filter(e => e.name === name)[0]);
    PubSub.publishSync('app.boardProps.hide', {});
    PubSub.publishSync('app.subTitle.hide', {});
    PubSub.publishSync('wrapper.boardOpen', {});
    PubSub.publishSync('app.subTitle.show', { text: name });
  }

  openBoardProps(event, board) {
    event.stopPropagation();
    
    PubSub.publish('app.boardProps.show', board);
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId:       module.id,
  selector:       'app-board',
  templateUrl:    'board.component.html',
  styleUrls:      ['board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() closeBoardPanel = new EventEmitter(true);
  boardTitle: string = `I'm BoardComponent`;

  constructor() { }

  ngOnInit() {
    //TODO: Create BaseComponent class extending Angular's Component and implement global promisable events in it with pubsub
    PubSub.subscribe('board.loadBoard', (ename: string, { board: { name } }) => this.boardTitle = name);
  }
}

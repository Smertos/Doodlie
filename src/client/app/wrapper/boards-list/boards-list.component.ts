import 'pubsub-js';

import { OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BaseComponent } from '../../decorators/base.component';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';
import { BoardsState } from '../../states/board.state';

import { BoardActions } from '../../reducers/board.reducer';

let _ = require('lodash');

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-boards-list',
  templateUrl:    'boards-list.component.html',
  styleUrls:      ['boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  @Output() openBoardPanel = new EventEmitter(true);
  boards: Observable<Board[]>;

  constructor(private bService: BoardsService, private store: Store<BoardsState>) {
    this.boards = this.store.select(state => _.sortBy(state.boards, ['createTime', 'name']));

    this.store.dispatch({ type: BoardActions.INIT_BOARD });
  }

  ngOnInit() {
    /*
    this.bService.subscribe(boards => this.boards = _.sortBy(boards, ['createTime', 'name']));
    this.bService.getAllBoards().then(boards => {
      this.boards = _.sortBy(boards, ['createTime', 'name']);
    });
    */

    PubSub.subscribe('app.promptSubmit', (en, { text: name }) => {
      this.store.dispatch({
        type: BoardActions.ADD_BOARD,
        payload: name
      });

      //PubSub.publish('wrapper.boardOpen', {});
      //PubSub.publish('board.loadBoard', board);
    });

  }

  newBoard(event: Event) {
    event.stopPropagation();
    
    PubSub.publish('app.openPrompt', {});
  }

  openBoard(event: Event, name: string) {
    event.stopPropagation();
    console.log(`Opened board '${name}'`);

    //PubSub.publish('board.loadBoard', this.boards.filter(e => e.name === name)[0]);
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

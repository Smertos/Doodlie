import 'pubsub-js';

import { OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BaseComponent } from '../../decorators/base.component';
import { BoardsService } from '../../services/boards.service';
import { Board } from '../../models/board';
import { IAppState } from '../../states/app.state';

import { BoardActions } from '../../reducers/board.reducer';
import { ListActions } from '../../reducers/list.reducer';
import { CardActions } from '../../reducers/card.reducer';

let _ = require('lodash');

@BaseComponent({
  moduleId: module.id,
  selector: 'app-boards-list',
  templateUrl: 'boards-list.component.html',
  styleUrls: ['boards-list.component.css']
})
export class BoardsListComponent implements OnInit {

  @Output() openBoardPanel = new EventEmitter(true);
  boards: Observable<Board[]>;

  constructor(private bService: BoardsService, private store: Store<IAppState>) {
    this.boards = this.store.select(state => _.sortBy(state.board.boards, ['createTime', 'name']));

    this.store.dispatch({ type: BoardActions.INIT_BOARD });
    this.store.dispatch({ type: ListActions.INIT_LIST });
    this.store.dispatch({ type: CardActions.INIT_CARD });
  }

  ngOnInit() {
    PubSub.subscribe('app.promptSubmit', (en, { text: name }) => {
      PubSub.publish('toast.success', { title: `Board '${name}' created!` });
      this.store.dispatch({
        type: BoardActions.ADD_BOARD,
        payload: name
      });
    });
  }

  newBoard(event: Event) {
    event.stopPropagation();

    PubSub.publish('app.openPrompt', {});
  }

  openBoard(event: Event, _id: string) {
    event.stopPropagation();

    this.bService
      .getBoard(_id)
      .then(b => {
        PubSub.publishSync('board.loadBoard', Board.from(b));
        PubSub.publishSync('board.open', {});
        PubSub.publishSync('app.subTitle.show', { text: b.name });
      });
    PubSub.publishSync('app.boardProps.hide', {});
  }

  openBoardProps(event, board) {
    event.stopPropagation();

    PubSub.publish('app.boardProps.show', board);
  }

}

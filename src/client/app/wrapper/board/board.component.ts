import { OnInit, Output, EventEmitter, HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BaseComponent } from '../../decorators/base.component';
import { BoardsService } from '../../services/boards.service';
import { IAppState } from '../../states/app.state';
import { Board } from '../../models/board';
import { List } from '../../models/list';
import { ListActions } from '../../reducers/list.reducer';

let _ = require('lodash');

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-board',
  templateUrl:    'board.component.html',
  styleUrls:      ['board.component.css']
})
export class BoardComponent implements OnInit {

  @HostBinding('class.shown') boardShown: boolean = false;
  @Output() closeBoardPanel = new EventEmitter(true);
  board: Board;
  lists: Observable<List[]>;

  constructor(private bService: BoardsService, private store: Store<IAppState>, private cd: ChangeDetectorRef) {
    this.lists = this.store.select(state => _.sortBy(state.list.lists, ['createTime', 'name']).reverse());
  }

  ngOnInit() {
    PubSub.subscribe('board.open', () => this.boardShown = true);
    PubSub.subscribe('board.close', () =>  {
      this.boardShown = false;
      this.cd.markForCheck();
    });

    PubSub.subscribe('board.loadBoard', (ename: string, board: Board) => {
      this.board = board;

      this.store.dispatch({
        type: ListActions.LOAD_BOARD_LIST,
        payload: this.board._id
      });

    });
  }

  createList(newName) {
    this.store.dispatch({
      type: ListActions.ADD_LIST,
      payload: { 
        parent_id: this.board._id,
        name: newName
      }
    });
  }

}

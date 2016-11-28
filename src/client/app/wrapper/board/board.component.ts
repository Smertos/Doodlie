import { OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BaseComponent } from '../../decorators/base.component';
import { BoardsService } from '../../services/boards.service';
import { IAppState } from '../../states/app.state';
import { Board } from '../../models/board';
import { List } from '../../models/list';
import { ListActions } from '../../reducers/list.reducer';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-board',
  templateUrl:    'board.component.html',
  styleUrls:      ['board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() closeBoardPanel = new EventEmitter(true);
  board: Board;
  lists: Observable<List[]>;
  newListName: string = '';

  constructor(private bService: BoardsService, private store: Store<IAppState>) {
    this.lists = this.store.select(state => state.list.lists);
  }

  ngOnInit() {
    PubSub.subscribe('board.loadBoard', (ename: string, board: Board) => {
      console.log(board);
      this.board = board;

      this.store.dispatch({
        type: ListActions.LOAD_BOARD_LIST,
        payload: this.board._id
      });

    });
  }

  createList() {
    console.log('New list name', this.newListName);
    console.log('Board', this.board);
    this.board.createList(this.newListName)
      .then(() => console.log(`Created board with name ${this.newListName}`))
      .then(() => this.newListName = '')
      .catch(console.error);
  }
}

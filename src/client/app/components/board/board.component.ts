import { OnInit, Output, EventEmitter, HostBinding, ChangeDetectorRef, ElementRef, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { BaseComponent } from '../../decorators/base.component';
import { BoardsService } from '../../services/boards.service';
import { IAppState } from '../../states/app.state';

import { Board } from '../../models/board';
import { List } from '../../models/list';

import { BoardActions } from '../../reducers/board.reducer';
import { ListActions } from '../../reducers/list.reducer';

let _ = require('lodash');

@BaseComponent({
  moduleId: module.id,
  selector: 'app-board',
  templateUrl: 'board.component.html',
  styleUrls: ['board.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BoardComponent implements OnInit, OnChanges {

  @HostBinding('class.shown') boardShown: boolean = false;
  @Output() closeBoardPanel = new EventEmitter(true);
  board: Board;
  lists: Observable<List[]>;
  maxScroll: Number = 0;
  currScroll: Number = 0;

  constructor(private bService: BoardsService, private store: Store<IAppState>, private cd: ChangeDetectorRef, private er: ElementRef) {
    this.lists = this.store.select(state =>
      _.sortBy(state.list.lists.filter(e => e.parent_id === (this.board || { _id: '-' })._id), ['createTime'])
    );
  }

  getScrollWidth() { return this.er.nativeElement.scrollWidth - this.er.nativeElement.clientWidth; }

  ngOnInit() {

    this.maxScroll = this.getScrollWidth();
    console.log(this.er.nativeElement.scrollWidth);
    console.log(this.er.nativeElement.clientWidth);
    console.log(this.maxScroll);

    this.er.nativeElement.onscroll = () => {
      this.maxScroll = this.getScrollWidth();
    };

    window.onresize = () => {
      this.maxScroll = this.getScrollWidth();
    };

    PubSub.subscribe('board.open', () => {
      this.boardShown = true;
      this.cd.markForCheck();
    });

    PubSub.subscribe('board.close', () => {
      this.boardShown = false;
      this.cd.markForCheck();
    });

    PubSub.subscribe('board.loadBoard', (ename: string, board: Board) => {
      this.board = board;

      this.maxScroll = this.getScrollWidth();
      console.log(this.er.nativeElement.scrollWidth);
      console.log(this.er.nativeElement.clientWidth);
      console.log(this.maxScroll);

      this.store.dispatch({ type: 'REFRESH' });
    });

    PubSub.subscribe('board.delete', (ename: string, board_id: string) => {
      this.store.dispatch({
        type: BoardActions.DELETE_BOARD,
        payload: board_id
      });
    });

  }

  ngOnChanges() {
    this.maxScroll = this.getScrollWidth();
    console.log(this.er.nativeElement.scrollWidth);
    console.log(this.er.nativeElement.clientWidth);
    console.log(this.maxScroll);
  }

  scroll(e) {
    this.er.nativeElement.scrollLeft = this.currScroll;
  }

  createList(newName) {
    PubSub.publish('toast.success', { title: `List '${newName}' created!` });
    this.store.dispatch({
      type: ListActions.ADD_LIST,
      payload: {
        parent_id: this.board._id,
        name: newName
      }
    });
  }

}

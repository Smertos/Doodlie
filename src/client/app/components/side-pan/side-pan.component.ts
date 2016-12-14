import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Board } from '../../models/board';
import { BoardActions } from '../../reducers/board.reducer';
import { IAppState } from '../../states/app.state';

@Component({
  moduleId: module.id,
  selector: 'app-side-pan',
  templateUrl: 'side-pan.component.html',
  styleUrls: ['side-pan.component.css']
})
export class SidePanComponent implements OnInit {

  @Input() board: Board;
  @Input() shown: boolean;
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() { }

  update() {
    this.store.dispatch({
      type: BoardActions.UPDATE_BOARD,
      payload: this.board
    });
    PubSub.publish('toast.success', { title: `Board renamed to '${this.board.name}'!` });
  }

  delete() {
    this.close.emit();
    this.store.dispatch({
      type: BoardActions.DELETE_BOARD,
      payload: this.board._id
    });
    PubSub.publish('toast.success', { title: `Board '${this.board.name}' deleted!` });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Board } from '../../models/board';
import { IAppState } from '../../states/app.state';

@Component({
  moduleId: module.id,
  selector: 'app-side-pan',
  templateUrl: 'side-pan.component.html',
  styleUrls: ['side-pan.component.css']
})
export class SidePanComponent implements OnInit {

  @Input() board: Board;

  constructor(private store: Store<IAppState>) { }

  ngOnInit() { }

  update(e) {
    console.log('Updating', this.board.name, e);

  }
}

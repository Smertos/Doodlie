import { OnInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { BaseComponent } from '../../decorators/base.component';
import { IAppState } from '../../states/app.state';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { CardActions } from '../../reducers/card.reducer';

let _ = require('lodash');

@BaseComponent({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  cards: Card[];

  constructor(private store: Store<IAppState>, private ds: DragulaService, private er: ElementRef, private cd: ChangeDetectorRef) {

    ds.drop.subscribe(d => {

      let list_id = d[2].parentNode.list_id;

      if (list_id === this.list._id) {

        let card = d[1].card;
        card.parent_id = list_id;

        this.store.dispatch({
          type: CardActions.UPDATE_CARD,
          payload: card
        });

      }

    });

  }

  ngOnInit() {
    this.store.subscribe(state => {
      this.cards = state.card.cards.filter((e: Card) => e.parent_id === this.list._id);
      this.cd.markForCheck();
    });

    this.er.nativeElement.list_id = this.list._id;
  }

  createCard(title) {
    this.store.dispatch({
      type: CardActions.ADD_CARD,
      payload: {
        parent_id: this.list._id,
        title: title
      }
    });

  }
}

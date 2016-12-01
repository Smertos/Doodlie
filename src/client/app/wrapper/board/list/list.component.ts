import { OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { BaseComponent } from '../../../decorators/base.component';
import { IAppState } from '../../../states/app.state';
import { List } from '../../../models/list';
import { Card } from '../../../models/card';
import { CardActions } from '../../../reducers/card.reducer';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-list',
  templateUrl:    'list.component.html',
  styleUrls:      ['list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  cards: Observable<Card[]>;

  constructor(private store: Store<IAppState>, private ds: DragulaService) {
    this.cards = this.store.select(state => state.card.cards);

    ds.drag.subscribe(console.log);
  }

  ngOnInit() {

    this.store.dispatch({
      type: CardActions.LOAD_LIST_CARD,
      payload: this.list._id
    });

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

import { OnInit, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { BaseComponent } from '../../decorators/base.component';
import { IAppState } from '../../states/app.state';
import { List } from '../../models/list';
import { Card } from '../../models/card';
import { ListActions } from '../../reducers/list.reducer';
import { CardActions } from '../../reducers/card.reducer';

@BaseComponent({
  moduleId: module.id,
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: List;
  cards: Card[];
  editMode: boolean = false;
  nameBuffer: string = '';

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

        PubSub.publish('toast.success', { title: `Card moved!` });

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
    PubSub.publish('toast.success', { title: `Card added!` });
    this.store.dispatch({
      type: CardActions.ADD_CARD,
      payload: {
        parent_id: this.list._id,
        title: title
      }
    });
  }

  update() {
    this.store.dispatch({
      type: ListActions.UPDATE_LIST,
      payload: this.list
    });
    PubSub.publish('toast.success', { title: `List renamed to '${this.list.name}'` });
    this.editMode = false;
  }

  edit() {
    this.nameBuffer = this.list.name;
    this.editMode = true;
  }

  cancel() {
    this.list.name = this.nameBuffer;
    this.editMode = false;
  }
}

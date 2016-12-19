import { Component, OnInit, HostBinding, animate, style, transition, state, trigger, EventEmitter, Output, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../states/app.state';
import { CardActions } from '../../reducers/card.reducer';
import { Card } from '../../models/card';

@Component({
  moduleId: module.id,
  selector: 'app-card-options',
  templateUrl: 'card-options.component.html',
  styleUrls: ['card-options.component.css'],
  animations: [

    trigger('shown',
      [

        state('false',
          style({
            transform: 'translateY(-100%)'
          })
        ),

        state('true',
          style({
            transform: 'translateY(0)'
          })
        ),

        transition('* => *', animate('200ms ease-in-out'))

      ]
    )

  ]
})
export class CardOptionsComponent implements OnInit {

  @Output()
  blur: EventEmitter<boolean> = new EventEmitter<boolean>();
  card: Card = Card.getDummy();
  shwn: boolean = false;

  @HostBinding('@shown')
  get shown() { return this.shwn; }
  set shown(val: boolean) {
    this.shwn = val;
    this.blur.emit(val);
  }

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    PubSub.subscribe('card-options.open', (ename: string, data: Card) => {
      this.card = data;
      this.shown = true;
    });
  }

  @HostListener('click')
  close() {
    this.shown = false;
  }

  cardClick(e: Event) {
    e.stopPropagation();
  }

  save() {
    this.store.dispatch({
      type: CardActions.UPDATE_CARD,
      payload: this.card
    });
  }

  delete() {
    this.store.dispatch({
      type: CardActions.DELETE_CARD,
      payload: this.card._id
    });
    this.shown = false;
  }
}

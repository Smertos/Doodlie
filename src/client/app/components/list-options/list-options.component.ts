import { Component, OnInit, HostBinding, animate, style, transition, state, trigger, EventEmitter, Output, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../states/app.state';
import { ListActions } from '../../reducers/list.reducer';
import { List } from '../../models/list';

@Component({
  moduleId: module.id,
  selector: 'app-list-options',
  templateUrl: 'list-options.component.html',
  styleUrls: ['list-options.component.css'],
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
export class ListOptionsComponent implements OnInit {

  @Output()
  blur: EventEmitter<boolean> = new EventEmitter<boolean>();
  list: List = List.getDummy();
  shwn: boolean = false;

  @HostBinding('@shown')
  get shown() { return this.shwn; }
  set shown(val: boolean) {
    this.shwn = val;
    this.blur.emit(val);
  }

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    PubSub.subscribe('list-options.open', (ename: string, data: List) => {
      this.list = data;
      this.shown = true;
    });
  }

  @HostListener('click')
  close() {
    this.shown = false;
  }

  listClick(e: Event) {
    e.stopPropagation();
  }

  save() {
    this.store.dispatch({
      type: ListActions.UPDATE_LIST,
      payload: this.list
    });
		PubSub.publish('toast.success', { title: `List name changed` });
  }

  delete() {
    this.store.dispatch({
      type: ListActions.DELETE_LIST,
      payload: this.list._id
    });
    PubSub.publish('toast.success', { title: `List deleted` });
    this.shown = false;
  }
}

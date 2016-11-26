import 'pubsub-js';

import { OnInit, HostBinding } from '@angular/core';
import { BaseComponent } from '../decorators/base.component';
import { BoardsService } from '../services/boards.service';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-wrapper',
  templateUrl:    'wrapper.component.html',
  styleUrls:      ['wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @HostBinding('class.opened') boardOpened: boolean = false;

  constructor(private boardsService: BoardsService) { }

  ngOnInit() { 
    PubSub.subscribe('wrapper.boardOpen', () => this.boardOpened = true);
    PubSub.subscribe('wrapper.boardClose', () => this.boardOpened = false);
  }
}

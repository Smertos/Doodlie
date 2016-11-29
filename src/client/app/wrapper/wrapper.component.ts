import 'pubsub-js';

import { OnInit } from '@angular/core';
import { BaseComponent } from '../decorators/base.component';
import { BoardsService } from '../services/boards.service';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-wrapper',
  templateUrl:    'wrapper.component.html',
  styleUrls:      ['wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  constructor(private boardsService: BoardsService) { }

  ngOnInit() { }
  
}
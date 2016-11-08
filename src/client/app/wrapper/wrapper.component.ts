import { Component, OnInit, HostBinding } from '@angular/core';
import { BoardsService } from '../services/boards.service';

@Component({
  moduleId:       module.id,
  selector:       'app-wrapper',
  templateUrl:    'wrapper.component.html',
  styleUrls:      ['wrapper.component.css']
})
export class WrapperComponent implements OnInit {

  @HostBinding('class.opened') boardOpened: boolean = false;

  constructor(private boardsService: BoardsService) { }

  ngOnInit() { }

  right() {
    console.log('right -->');
    this.boardOpened = true;
  }
  
  left() {
    console.log('<-- left');
    this.boardOpened = false;
  }
}

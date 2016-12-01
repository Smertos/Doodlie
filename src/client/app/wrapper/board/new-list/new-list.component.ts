import { OnInit, Input, Output, EventEmitter, animate, state, trigger, style, transition } from '@angular/core';
import { BaseComponent } from '../../../decorators/base.component';
import { List } from '../../../models/list';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-new-list',
  templateUrl:    'new-list.component.html',
  styleUrls:      ['new-list.component.css']
})
export class NewListComponent implements OnInit {

  @Output() newList: EventEmitter<string> = new EventEmitter();
  editMode: boolean = false;
  newName: string = '';

  constructor() { }

  ngOnInit() { }

  reset() {
      this.editMode = false;
      this.newName = '';
  }

  create() {
    if(this.newName != '') {
      this.newList.emit(this.newName);
      this.editMode = false;
    }
      this.newName = '';   
  }
}

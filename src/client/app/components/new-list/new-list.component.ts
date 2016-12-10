import { OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../decorators/base.component';

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
    if(this.newName !== '') {
      this.newList.emit(this.newName);
      this.editMode = false;
    } else PubSub.publish('toast.error', { title: 'The list was not created', body: 'List name cannot be empty' });
  }
}

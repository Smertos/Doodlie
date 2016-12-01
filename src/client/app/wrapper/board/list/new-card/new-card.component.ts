import { OnInit, Input, Output, EventEmitter, animate, state, trigger, style, transition } from '@angular/core';
import { BaseComponent } from '../../../../decorators/base.component';
import { Card } from '../../../../models/card';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-new-card',
  templateUrl:    'new-card.component.html',
  styleUrls:      ['new-card.component.css']
})
export class NewCardComponent implements OnInit {

  @Output() newCard: EventEmitter<string> = new EventEmitter();
  editMode: boolean = false;
  newTitle: string = '';

  constructor() { }

  ngOnInit() { }

  reset() {
      this.editMode = false;
      this.newTitle = '';
  }

  create() {
      if(this.newTitle != '') {
        this.newCard.emit(this.newTitle);
        this.editMode = false;
      }
      this.newTitle = '';   
  }
}

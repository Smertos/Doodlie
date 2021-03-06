import { OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../../decorators/base.component';

@BaseComponent({
  moduleId: module.id,
  selector: 'app-new-card',
  templateUrl: 'new-card.component.html',
  styleUrls: ['new-card.component.css']
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
    if (this.newTitle !== '') {
      this.newCard.emit(this.newTitle);
      this.editMode = false;
    } else PubSub.publish('toast.error', { title: 'The card was not created', body: 'Card title cannot be empty' });
  }
}

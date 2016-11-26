import { OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../decorators/base.component';
import { List } from '../../../models/list';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-list',
  templateUrl:    'list.component.html',
  styleUrls:      ['list.component.css']
})
export class BoardComponent implements OnInit {

  @Input() list: List;
  newTitleName: string = '';

  constructor() { }

  ngOnInit() { }

  createCard() {
    console.log('New card title', this.newTitleName);
    console.log('List', this.list);
    this.list.createCard(this.newTitleName);
  }
}

import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { List } from '../../../models/list';


@Component({
  moduleId:       module.id,
  selector:       'app-list',
  templateUrl:    'list.component.html',
  styleUrls:      ['list.component.css']
})
export class BoardComponent implements OnInit {

  @Input() list: List;
  newTitleName: string = '';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }

  createCard() {
    console.log('New card title', this.newTitleName);
    console.log('List', this.list);
    this.list.createCard(this.newTitleName);
    this.cdr.detectChanges();
  }
}

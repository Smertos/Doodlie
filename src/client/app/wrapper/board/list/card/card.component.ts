import { OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../../decorators/base.component';
import { Card } from '../../../../models/card';

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-card',
  templateUrl:    'card.component.html',
  styleUrls:      ['card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  constructor() { }

  ngOnInit() { }
}

import { OnInit, Input, ElementRef } from '@angular/core';
import { BaseComponent } from '../../decorators/base.component';
import { Card } from '../../models/card';

@BaseComponent({
  moduleId: module.id,
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card;

  constructor(private er: ElementRef) { }

  ngOnInit() {
    this.er.nativeElement.card = this.card;
  }
}

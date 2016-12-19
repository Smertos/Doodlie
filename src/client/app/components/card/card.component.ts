import { OnInit, Input, ElementRef, HostListener } from '@angular/core';
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

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    PubSub.publishSync('card-options.open', this.card);
  }

  ngOnInit() {
    this.er.nativeElement.card = this.card;
  }
}

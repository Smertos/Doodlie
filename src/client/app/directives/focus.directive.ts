import { Directive, ElementRef, Inject, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class FocusDirective implements AfterContentInit {
  constructor(@Inject(ElementRef) private er: ElementRef) { }

  ngAfterContentInit() {
    if(!(this.er.nativeElement instanceof HTMLInputElement)) {
      this.er.nativeElement.querySelector('input').focus();
    } else {
      this.er.nativeElement.focus();
    }
  }

}

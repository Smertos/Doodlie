import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
@Component({
  moduleId:       module.id,
  selector:       'app-root',
  templateUrl:    'app.component.html',
  styleUrls:      [ 'app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements AfterViewInit {
  appTitle: string = 'Doodlie';

  ngAfterViewInit() {
    let loaderStyle = (<HTMLElement>document.getElementById('loader')).style;
    
    loaderStyle.opacity = '0';
    setTimeout(() => loaderStyle.display = 'none', 900);
  }
 }

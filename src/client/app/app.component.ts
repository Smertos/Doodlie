import { Component, ChangeDetectionStrategy, OnInit, AfterViewInit } from '@angular/core';

@Component({
  moduleId:       module.id,
  selector:       'app-root',
  templateUrl:    'app.component.html',
  styleUrls:      [ 'app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle: string = 'Doodlie';
  statusLine: string = 'Select your board';

  ngOnInit() {
    document.addEventListener('d.open-board', e => {
      console.log(e);
    });
  }

  ngAfterViewInit() {
    let loaderStyle = (<HTMLElement>document.getElementById('loader')).style;
    let statusBarStyle = (<HTMLElement>document.getElementById('status-block')).style; //TODO: Replace status bar animation with angular's one

    loaderStyle.opacity = '0';
    setTimeout(() => {
      loaderStyle.display = 'none';
      statusBarStyle.top = '0px';
    }, 900);
  }

  back() {
    PubSub.publish('wrapper.boardClose', {})
  }

 }

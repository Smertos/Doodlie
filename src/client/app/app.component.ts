import { ChangeDetectionStrategy, OnInit, AfterViewInit, animate, state, trigger, style, transition } from '@angular/core';
import { BaseComponent } from './decorators/base.component';

import { Board } from './models/board';

let isElectron = window.require !== void 0;
var ipcRenderer;

console.log('isElectron', isElectron);


/*
if(isElectron) { //TODO: fix electron being not require-able, 'causer SystemJS replaces 'require' func
  ipcRenderer = require('electron').ipcRenderer;
}
*/

@BaseComponent({
  moduleId:       module.id,
  selector:       'app-root',
  templateUrl:    'app.component.html',
  styleUrls:      [ 'app.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [

    trigger('subTitleState', [
      state('true', style({
        top: '0px'
      })),
      state('false', style({
        top: '-30px'
      })),
      transition('* => *', animate('200ms'))
    ]),

    trigger('subPanState', [
      state('true', style({
        right: '0px'
      })),
      state('false', style({
        right: '-400px'
      })),
      transition('* => *', animate('200ms'))
    ]),

    trigger('arrowState', [
      state('true', style({
        transform: 'translateY(0)'
      })),
      state('false', style({
        transform: 'translateY(-100%)'
      })),
      transition('* => *', animate('200ms'))
    ])

  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  appTitle: string = 'DOODLIE';
  subTitle: string = 'Select your board';

  showPrompt: boolean = false;
  promptText: string = '';

  winControlsDisplay: string = '';
  subTitleShown: boolean = false;

  sidePanBoardName: string = '';
  sidePanShown: boolean = false;

  arrowShown: boolean = false;

  constructor() {
    this.winControlsDisplay = isElectron ? 'flex' : 'none';

    PubSub.subscribe('app.openPrompt', () => this.showPrompt = true);
    PubSub.subscribe('app.subTitle.show', (en: string, { text: t }) => {
      this.subTitle = t;
      this.subTitleShown = true;
    });
    PubSub.subscribe('app.subTitle.hide', () => this.subTitleShown = false);

    PubSub.subscribe('app.boardProps.show', (en: string, board: Board) => {
      this.sidePanBoardName = board.name;
      this.sidePanShown = true;
    });
    PubSub.subscribe('app.boardProps.hide', () => this.sidePanShown = false);

    PubSub.subscribe('board.open', () => this.arrowShown = true);
    PubSub.subscribe('board.close', () => this.arrowShown = false);
  }

  notClosePrompt(e) {
    e.stopPropagation();
  }

  closePrompt() {
    this.showPrompt = false;
    this.promptText = '';
  }

  onPromptClick(e) {

    PubSub.publish('app.promptSubmit', { text: this.promptText });
    this.showPrompt = false;
    this.promptText = '';
  }

  ngOnInit() {
    PubSub.subscribe('app.setSubTitle', (ename, newSubTitle) => this.subTitle = newSubTitle);
  }

  ngAfterViewInit() {
    let loaderStyle = (<HTMLElement>document.getElementById('loader')).style;
    //let statusBarStyle = (<HTMLElement>document.getElementById('status-block')).style; //TODO: Replace status bar animation with angular's one

    loaderStyle.opacity = '0';
    setTimeout(() => {
      loaderStyle.display = 'none';
      this.subTitleShown = true;
      //statusBarStyle.top = '0px';
    }, 900);
  }

  back() {
    PubSub.publish('board.close', {});
    this.subTitle = 'Select your board';
  }

  minimize() {
    if(isElectron) {
      ipcRenderer.send('minimize');
    }
  }

  maximize() {
    if(isElectron) {
      ipcRenderer.send('maximize');
    }
  }

  close() {
    if(isElectron) {
      ipcRenderer.send('exit');
    } 
  }

 }

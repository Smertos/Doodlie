import { ChangeDetectionStrategy, OnInit, AfterViewInit, animate, state, trigger, style, transition } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { BaseComponent } from '../../decorators/base.component';
import { Board } from '../../models/board';

var isElectron = String('<%= TARGET_DESKTOP %>') === 'true';

if (isElectron) {
  var ipcRenderer = require('electron').ipcRenderer;
}

@BaseComponent({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [

    trigger('subPanState', [

      state('true', style({
        right: '0px'
      })),

      state('false', style({
        right: '-310px'
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

  maximized: boolean = false;

  showPrompt: boolean = false;
  promptText: string = '';

  winControlsDisplay: string = '';

  sidePanShown: boolean = false;
  sidePanBoard: Board = Board.getDummy();

  arrowShown: boolean = false;
  showBlur: boolean = false;

  toastOptions: any = {
    position: ['bottom','right'],
    timeOut: 3500,
    showProgressBar: false,
    pauseOnHover: false,
    lastOnBottom: true,
    clickToClose: true,
    maxStack: 3,
    preventDuplicates: false,
    animate: 'fromRight'
  };

  constructor(private ns: NotificationsService) {
    this.winControlsDisplay = isElectron ? 'flex' : 'none';

    PubSub.subscribe('app.openPrompt', () => this.showPrompt = true);
    PubSub.subscribe('app.subTitle', (en: string, { text: t }) => this.subTitle = t);

    PubSub.subscribe('app.boardProps.show', (en: string, board: Board) => {
      this.sidePanBoard = board;
      this.sidePanShown = true;
    });
    PubSub.subscribe('app.boardProps.hide', () => this.sidePanShown = false);

    PubSub.subscribe('board.open', () => this.arrowShown = true);
    PubSub.subscribe('board.close', () => this.arrowShown = false);

    PubSub.subscribe('toast.info', (en: string, data: { title: string, body: string }) =>
      this.ns.info(data.title || '', data.body || '', data.body === void 0 ? { theClass: 'sn' } : {})
    );

    PubSub.subscribe('toast.success', (en: string, data: { title: string, body: string }) =>
      this.ns.success(data.title || '', data.body || '', data.body === void 0 ? { theClass: 'sn' } : {})
    );

    PubSub.subscribe('toast.error', (en: string, data: { title: string, body: string }) =>
      this.ns.error(data.title || '', data.body || '', data.body === void 0 ? { theClass: 'sn' } : {})
    );
  }

  notClosePrompt(e) {
    e.stopPropagation();
  }

  closePrompt() {
    this.showPrompt = false;
    this.promptText = '';
  }

  onPromptClick() {
    if(this.promptText === '') {
      PubSub.publish('toast.error', { title: 'The board was not created', body: 'Board name cannot be empty' });
    } else {
      PubSub.publish('app.promptSubmit', { text: this.promptText });
      this.showPrompt = false;
      this.promptText = '';
    }
  }

  ngOnInit() {
    PubSub.subscribe('app.setSubTitle', (ename, newSubTitle) => this.subTitle = newSubTitle);
  }

  ngAfterViewInit() {
    let loaderStyle = (<HTMLElement>document.getElementById('loader')).style;
    loaderStyle.opacity = '0';
    setTimeout(() => loaderStyle.display = 'none', 900);
  }

  back() {
    PubSub.publish('board.close', {});
    this.subTitle = 'Select your board';
  }

  minimize() {
    if (isElectron) {
      ipcRenderer.send('minimize');
    }
  }

  maximize() {
    if (isElectron) {
      this.maximized = !this.maximized;
      ipcRenderer.send('maximize');
    }
  }

  close() {
    if (isElectron) {
      ipcRenderer.send('exit');
    }
  }

  blur(val: boolean) {
    this.showBlur = val;
  }

}

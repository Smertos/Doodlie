import { app, BrowserWindow } from 'electron';

let mainWindow: Electron.BrowserWindow = null;

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  let appTitle: string = `Doodlie`;

  //Initialize new window
  mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    frame: false
  });

  //Hide window, load app, set window title and show it
  mainWindow.hide();
  mainWindow.loadURL(`file://${__dirname}/../index.html`);
  mainWindow.setTitle(appTitle);
  mainWindow.show();

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  mainWindow.webContents.on('did-navigate-in-page', (_: any, url: string) => {
    console.log(`Page navigated: ${url}`)
  });

  mainWindow.webContents.on('minimize', () => {
    if(mainWindow.isMinimized()) {
      mainWindow.restore();
    console.log('Got request for:', 'restore');
    }
    else {
      mainWindow.minimize();
    console.log('Got request for:', 'minimize');
    }
  });

  mainWindow.webContents.on('maximize', () => {
    if(mainWindow.isMaximized) {
      mainWindow.minimize();
    console.log('Got request for:', 'minimize');
    }
    else {
      mainWindow.maximize();
    console.log('Got request for:', 'maximize');
    }
  });

  mainWindow.webContents.once('close', () => {
    console.log('Got request for:', 'close');
    mainWindow.close();
  });

});

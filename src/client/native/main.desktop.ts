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
    height: 600,
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
    if(mainWindow.isMinimized()) mainWindow.restore();
    else mainWindow.minimize
  });

  mainWindow.webContents.on('maximize', () => {
    if(mainWindow.isMaximized) mainWindow.minimize();
    else mainWindow.maximize();
  });

  mainWindow.webContents.once('close', () => {
    mainWindow.close();
  });

});

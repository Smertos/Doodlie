import { app, BrowserWindow, ipcMain } from 'electron';

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
    mainWindow = null;
  });

  ipcMain.on('minimize', () => {
    if(mainWindow.isMinimized()) {
      mainWindow.restore();
    } else {
      mainWindow.minimize();
    }
  });

  ipcMain.on('maximize', () => {
    if(mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });

  ipcMain.once('exit', () => {
    mainWindow.close();
  });

});

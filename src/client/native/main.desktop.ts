process.env.NODE_ENV = process.env.NODE_ENV || 'production'
console.log(`Electron launching with NODE_ENV: ${process.env.NODE_ENV}`)

const electron = require('electron')
const app = electron.app
const Menu: any = electron.Menu
const shell: any = electron.shell
// const crashReporter = electron.crashReporter
const BrowserWindow = electron.BrowserWindow
let mainWindow: Electron.BrowserWindow = null

// app
import { AppConfig } from '../app/frameworks/doodlie/services/app-config'

// You would need a valid `submitURL` to use
// crashReporter.start({
//   productName: 'AngularSeedAdvanced',
//   companyName: 'NathanWalker',
//   submitURL: 'https://github.com/NathanWalker/angular-seed-advanced',
//   autoSubmit: true
// })

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 620
  })
  mainWindow.loadURL(`file://${__dirname}/../index.html`)

  // Clear out the main window when the app is closed
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.webContents.on('did-navigate-in-page', (e: any, url: string) => {
    console.log(`Page navigated: ${url}`)
  })

  let appTitle: string = `Doodlie`

  mainWindow.setTitle(appTitle)

})

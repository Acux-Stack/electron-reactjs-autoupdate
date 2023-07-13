const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");

let tray
const { autoUpdater } = require('electron-updater');
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    frame:false,
    // flashFrame: false,
    // alwaysOnTop:false,
    width: 800,
    height: 600,
    minHeight: 600,
    minWidth: 800,
    transparent: true,
    // resizable: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    titleBarOverlay: {
      color: '#022771',
      symbolColor: '#fff',
      height: 30
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });

  mainWindow.once('focus', () => mainWindow.flashFrame(false))
  mainWindow.flashFrame(false)
  attachTitlebarToWindow(mainWindow);
}

Menu.setApplicationMenu(null)

app.on('ready', () =>{
  autoUpdater.checkForUpdatesAndNotify();
  createWindow();
});

// app.on('ready-to-show', () => {
//     createWindow();
// });

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});





// // Modules to control application life and create native browser window
// const { app, BrowserWindow } = require('electron')
// const path = require('path')

// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   // and load the index.html of the app.
// //   mainWindow.loadFile('index.html')
//   mainWindow.loadFile(path.join(__dirname, 'index.html'))


//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

// // In this file you can include the rest of your app's specific main process
// // code. You can also put them in separate files and require them here.
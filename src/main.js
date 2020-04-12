const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { Store } = require('./js/store.js');

let mainWindow

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 230, height: 300 },
    styleSize: "small",
    data: {
      courses: [{
        "name": "Calculus",
        "color": "#ffffcc",
        "tasks": [
          {
            "content": "REVIEW COURSE",
            "date": "30/03",
            "done": false
          },
          {
            "content": "EXERCISE 3.4",
            "date": "14/03",
            "done": true
          }
        ]
      },
      {
        "name": "Japanese",
        "color": "#ffcccc",
        "tasks": [
          {
            "content": "PREPARE SPEECH",
            "date": "23/05",
            "done": true
          },
          {
            "content": "WORK ON THE EXAM",
            "date": "19/09",
            "done": false
          }
        ]
      },
      {
        "name": "Personal",
        "color": "#ccffcc",
        "tasks": [
          {
            "content": "WORK OUT",
            "date": "../..",
            "done": false
          },
          {
            "content": "READ 30 MINUTES",
            "date": "../..",
            "done": false
          }
        ]
      }]
    }
  }
});

function createWindow() {

  let { width, height } = store.get('windowBounds');
  store.set('windowBounds', { width, height });

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    maxWidth: width,
    minHeight: 0,
    maximizable: false,
    resizable: true,
    vibrancy: "content",
    title: "Patault ToDo"
  }); //transparent: true


  //mainWindow.setVibrancy("dark"); -> mode sombre

  /* let index_url = 'gui/index-small.html';
  if (store.get('styleSize') == "large") {
    index_url = 'gui/index-large.html';
  } */

  let index_url = 'gui/index.html';

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, index_url),
    protocol: 'file:',
    slashes: true
  }));


  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  /* mainWindow.on('resize', function () {
    mainWindow.setBounds()
  }); */

  require('./js/mainmenu.js');
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);



app.on('window-all-closed', function () {
  app.quit()
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


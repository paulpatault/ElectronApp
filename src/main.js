const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { Store } = require('./js/store.js');

let mainWindow;

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 230, height: 300 },
    styleSize: "small",
    firstRun: true,
    fields: [{
      "name": "Calculus",
      "color": "#ffffcc"
    },
    {
      "name": "Japanese",
      "color": "#ffcccc"
    },
    {
      "name": "Personal",
      "color": "#ccffcc"
    }],
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
  store.set('firstRun', true);

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    //maxWidth: width,
    minHeight: 0,
    maximizable: false,
    resizable: true,
    vibrancy: "content",
    title: "Patault ToDo"
  }); //transparent: true


  //mainWindow.setVibrancy("dark"); -> mode sombre

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'gui/index.html'),
    protocol: 'file:',
    slashes: true
  }));


  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  /* mainWindow.on('resize', function () {
    mainWindow.setBounds()
  }); */

  require('./js/mainmenu.js');
}

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


function more() {
  let { width, height } = store.get('windowBounds');

  const { BrowserWindow } = require('electron');
  let child = new BrowserWindow({
    width: width * 0.7,
    height: height * 0.8,
    parent: mainWindow,
    modal: true,
    show: false,
    resizable: true
  }); //parent: mainWindow, modal: true, show: false });
  child.webContents.openDevTools();

  child.loadURL(url.format({
    pathname: path.join(__dirname, 'gui/html/fields.html'),
    protocol: 'file:',
    slashes: true
  }));
  /* child.once('ready-to-show', () => {
    child.show();
  }); */
  return child;
}

module.exports = { more }; 
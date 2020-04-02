const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { Store } = require('./store.js');

let mainWindow

// First instantiate the class
const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 300, height: 600 },
    data: {
      courses: [{
        "name": "Algebre",
        "color": "#ffffcc",
        "tasks": [
          {
            "content": "EXERCICES 9+10",
            "date": "30/03",
            "done": true
          },
          {
            "content": "REVOIR ALGEBRE",
            "date": "14/03",
            "done": false
          }
        ]
      },
      {
        "name": "Japonais",
        "color": "#ffcccc",
        "tasks": [
          {
            "content": "PREPARER SPEECH",
            "date": "23/05",
            "done": true
          },
          {
            "content": "EXERCICE 2",
            "date": "19/09",
            "done": false
          }
        ]
      },
      {
        "name": "App",
        "color": "#ccffcc",
        "tasks": [
          {
            "content": "Modal in modal as scheme",
            "date": "../..",
            "done": true
          }
        ]
      }]
    }
  }
});

function createWindow() {

  let { width, height } = store.get('windowBounds');

  mainWindow = new BrowserWindow({ width, height }); //transparent: true

  mainWindow.setVibrancy("content");
  mainWindow.setMaximizable(false);

  //mainWindow.setResizable(false)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/gui/app-0.4.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  });
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


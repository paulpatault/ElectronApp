const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { Store } = require('./src/js/store.js');

let mainWindow

const store = new Store({
  configName: 'user-preferences',
  defaults: {
    windowBounds: { width: 300, height: 600 },
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
    height: height
    //icon: path.join(__dirname, 'build/logo.png')
  }); //transparent: true

  mainWindow.setVibrancy("content");

  //mainWindow.setVibrancy("dark"); -> mode sombre
  mainWindow.setMaximizable(false);

  //mainWindow.setResizable(false);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/gui/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  });

  require('./src/js/mainmenu.js');

  /* 
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  }); */
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


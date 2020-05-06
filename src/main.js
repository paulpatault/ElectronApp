const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

const { Store, defaults } = require('./js/store.js');

const store = new Store({
  configName: 'user-preferences',
  defaults: defaults
});

let mainWindow;

function createWindow() {

  let { width, height } = store.get('windowBounds');

  store.set('windowBounds', { width, height });
  store.set('firstRun', true);

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    minWidth: width,
    maxWidth: width,
    minHeight: 0,
    maximizable: false,
    resizable: true,
    vibrancy: "content",
    title: "Patault ToDo",
    show: false,
    //titleBarStyle: 'hidden',
    //frame: false
  }); //transparent: true

  //mainWindow.setVibrancy("dark"); -> mode sombre

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'gui/index.html'),
    //pathname: path.join(__dirname, 'gui/html/fields.html'),
    protocol: 'file:',
    slashes: true
  }));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  });

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

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  app.quit()
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

function fieldsModal() {
  const { BrowserWindow } = require('electron');

  let child = new BrowserWindow({
    width: 170,
    height: 150,
    resizable: false,
    parent: mainWindow,
    modal: true,
    show: false,
  });

  //child.webContents.openDevTools();
  child.loadURL(url.format({
    pathname: path.join(__dirname, 'gui/html/fields.html'),
    protocol: 'file:',
    slashes: true
  }));

  return child;
}

function mainReload() {
  mainWindow.reload();
}

function mainFocus() {
  mainWindow.focus();
}

module.exports = { mainReload, mainFocus, fieldsModal }; 
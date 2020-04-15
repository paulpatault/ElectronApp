const { Menu, app } = require('electron')
//const { openModal_ } = require('./methods.js');

const template0 = [
    {
        label: 'Options',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'pasteandmatchstyle'
            },
            {
                role: 'delete'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload()
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools()
                }
            },
            {
                type: 'separator'
            },
            {
                role: 'resetzoom'
            },
            {
                role: 'zoomin'
            },
            {
                role: 'zoomout'
            },
            {
                type: 'separator'
            },
            {
                role: 'togglefullscreen'
            }
        ]
    },
    {
        role: 'window',
        submenu: [
            {
                label: 'Screen size',
                submenu: [
                    {
                        label: 'small',
                        click() { require('electron').shell.openExternal('http://electron.atom.io') }

                    },
                    {
                        label: 'large',
                        click() { require('electron').shell.openExternal('http://electron.atom.io') }
                    }
                ]
            },
            {
                role: 'minimize'
            },
            {
                role: 'close'
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { require('electron').shell.openExternal('http://electron.atom.io') }
            }
        ]
    }
]


const template = [
    /* 
    {
        label: 'Edit',
        submenu: [
            {
                label: 'New task',
                accelerator: 'CmdOrCtrl+N',
                click() {
                    openModal_();
                }
            }
        ]
    }, */
    {
        label: 'Options',
        submenu: [
            {
                role: 'undo'
            },
            {
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                role: 'cut'
            },
            {
                role: 'copy'
            },
            {
                role: 'paste'
            },
            {
                role: 'selectall'
            }
        ]
    },
    {
        label: 'Window',
        submenu: [
            {
                label: 'Size',
                submenu: [
                    {
                        label: 'small',
                        accelerator: 'CmdOrCtrl+Alt+S',
                        click() {
                            const { Store } = require('./store.js');

                            const data = new Store({
                                configName: 'user-preferences',
                                defaults: {}
                            });

                            if (data.get('styleSize') != 'small') {
                                let { width, height } = { width: 230, height: 300 };

                                data.set('windowBounds', { width, height });

                                data.set('styleSize', "small");
                                data.set('firstRun', true);

                                app.relaunch();
                                app.exit(0);
                            }
                        }
                    },
                    {
                        label: 'large',
                        accelerator: 'CmdOrCtrl+Alt+L',
                        click() {
                            const { Store } = require('./store.js');

                            const data = new Store({
                                configName: 'user-preferences',
                                defaults: {}
                            });

                            if (data.get('styleSize') != 'large') {
                                let { width, height } = { width: 300, height: 600 };

                                data.set('windowBounds', { width, height });

                                data.set('styleSize', "large");
                                data.set('firstRun', true);

                                app.relaunch();
                                app.exit(0);
                            }
                        }
                    }
                ]
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    const { Store } = require('./store.js');
                    const data = new Store({
                        configName: 'user-preferences',
                        defaults: {}
                    });
                    data.set('firstRun', true);

                    if (focusedWindow) focusedWindow.reload();
                }
            },
            {
                label: 'Relaunch',
                accelerator: 'CmdOrCtrl+Shift+R',
                click(item, focusedWindow) {
                    const { Store } = require('./store.js');
                    const data = new Store({
                        configName: 'user-preferences',
                        defaults: {}
                    });
                    data.set('firstRun', true);

                    app.relaunch();
                    app.exit(0);
                }
            }
        ]
    },
    {
        label: 'Credit',
        submenu: [
            {
                label: 'Technology used',
                click() { require('electron').shell.openExternal('https://www.electronjs.org/') }
            },
            {
                label: 'About Developer',
                accelerator: 'F1',
                click() { require('electron').shell.openExternal('https://paulpatault.fr') }
            }
        ]
    }
]

if (process.platform === 'darwin') {
    const name = app.getName()
    template.unshift({
        label: name,
        submenu: [
            {
                //role: 'about',
                label: 'About ' + name,
                click() { require('electron').shell.openExternal('https://github.com/paulpatault/ElectronApp') }
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                label: 'Minimize',
                accelerator: 'CmdOrCtrl+M',
                role: 'minimize'
            },
            {
                role: 'quit',
                //  label: 'Quit ' + 'ToDo',
                accelerator: 'CmdOrCtrl+Q'
            }
            //{ role: 'quit' }
        ]
    })
    // Edit menu.
    /* template[1].submenu.push(
        {
            type: 'separator'
        },
        {
            label: 'Speech',
            submenu: [
                {
                    role: 'startspeaking'
                },
                {
                    role: 'stopspeaking'
                }
            ]
        }
    ) */
    // Window menu.
    /* template[0].submenu = [
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            role: 'hide',
            label: 'Hide ToDo',
            accelerator: 'CmdOrCtrl+H'
        },
        {
            type: 'separator'
        },
        {
            role: 'quit',
            //  label: 'Quit ' + 'ToDo',
            accelerator: 'CmdOrCtrl+Q'
        }
    ] */
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
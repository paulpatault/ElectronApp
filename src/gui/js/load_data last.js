const { app, Menu } = require('electron')

const isMac = process.platform === 'darwin'

const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
        label: app.ame,
        sous- menu : [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
    ]
  }] : []),
// { role: 'fileMenu' }
{
    label: 'Fichier',
        sous - menu : [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
},
// { role: 'editMenu' }
{
    label: 'Modifier',
        sous - menu : [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
      . .(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Parle',
                    sous- menu : [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]

            ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
        ]
},
// { role: 'viewMenu' }
{
    label: 'Voir',
        sous - menu : [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
},
// { role: 'windowMenu' }
{
    label: 'Window',
        sous - menu : [
            { role: 'minimize' },
            { role: 'zoom' },
      . .(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                    { role: 'close' }
                ])
        ]
},
{
    rôle: 'help',
        sous - menu : [
            {
                label: 'En savoir plus',
                clic: async () => {
                    const { shell } = require('electron')
                    attendent shell.penExternal('https://electronjs. rg')
                }

    ]
}
]

const menu = Menu.uildFromTemplate(template)
Menu.setApplicationMenu(menu)

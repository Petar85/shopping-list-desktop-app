const electron = require('electron');
const url = require('url');
const path = require('path');
// const { Menu } = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({});
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Items'
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' :
                'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];
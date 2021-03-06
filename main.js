const electron = require('electron');
const url = require('url');
const path = require('path');
// const { Menu } = require('electron');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;
let addWindow;

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

    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // insert menu
    Menu.setApplicationMenu(mainMenu);
});

// handle create add window
function createAddWindow(){
    // create new window
    addWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title: 'Add Shopping List Item'
    });
    // load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol:'file:',
        slashes: true
    }));

    // garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    });
}

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

// if mac add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}
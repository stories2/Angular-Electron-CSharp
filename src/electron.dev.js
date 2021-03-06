const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
let spawn = require("child_process").spawn;
  
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
    // set timeout to render the window not until the Angular 
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window.
        win = new BrowserWindow({
            width: 480,
            height: 768,
            minWidth: 480,
            minHeight: 768, 
            icon: './src/favicon.ico',
            webPreferences: {
                enableRemoteModule: false,
                nodeIntegration: true,
                backgroundThrottling: false
            }
        });

        // and load the app.
        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
            slashes: true
        }));

        win.webContents.openDevTools();
        // win.setMenu(null);

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

ipcMain.on('ping', (event, arg) => {

    console.log('[electron] [ping] arg', arg);
    event.sender.send('pong', {
        msg: 'ping - pong'
    })
})

ipcMain.on('run-csharp', (event, arg) => {

    console.log('[electron] [run-csharp] arg', arg);
    event.sender.send('pong', {
        msg: 'ping - pong'
    })
})

ipcMain.on('cscript', (event, arg) => {
    let result = {
        code: arg.code,
        status: -1,
        msg: null,
        console: null
    }

    console.log('arg', arg);

    let bat = spawn("cscript.exe", arg.args);
    
    bat.stdout.on("data", (data) => {
        // Handle data...
        console.log('stdout data',data, JSON.stringify(data))
        result.console += data;
    });
    
    bat.stderr.on("data", (err) => {
        // Handle error...
        console.log('stderr', err);
        result.msg = err.message
    });
    
    bat.on("exit", (code) => {
        // Handle exit

        result.status = code;
        console.log('result', result, JSON.stringify(result.console));
        event.sender.send('job', result);
    });
})
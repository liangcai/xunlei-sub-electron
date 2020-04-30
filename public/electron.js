// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const {PythonShell} = require("python-shell")
require('dotenv').config()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadURL('http://localhost:3000/')
  if (process.env.DEBUG) {
    
  }
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

const OS = process.platform;

if (process.env.DEBUG) {
  console.log('use python-shell');

  let pythonPath;
  if (OS === 'darwin' || OS === 'linux') {
    pythonPath = '.venv/bin/python'
  } else {
    pythonPath = '.venv/Scripts/python'
  }
  
  PythonShell.run(
    "api/app.py", {pythonPath: pythonPath}, function(err, results){
      if (err) throw err
      console.log('app.py is running')
      console.log('results', results)
    }
  );
} else {
  console.log('use pyinstaller');
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

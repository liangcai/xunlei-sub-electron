// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
// const {PythonShell} = require("python-shell")
const fs = require("fs")

let PY_DIST_FOLDER = 'pydist'
let PY_FOLDER = 'api'
let PY_MODULE = 'app'
let PY_PORT = 5000
let pyProc = null

const guessPackaged = () => {
  console.log('env到底能不能用，PY_DIST_FOLDER', PY_DIST_FOLDER)
  const fullPath = path.join(__dirname, PY_DIST_FOLDER)
  if (process.env.NODE_ENV === "development") {
    console.log('Guess packaged path: ' + fullPath)
  }
  return fs.existsSync(fullPath)
}

const getScriptPath = () => {
  if (!guessPackaged()) {
    return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
  }

  if (process.platform == 'win32') {
    return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
  }

  return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

const getPythonPath = () => {
  if (process.platform == 'win32') {
    return path.join(__dirname, '.venv/Scripts/python')
  }
  return path.join(__dirname, '.venv/bin/python')
}

const createPyProc = () => {
  let script = getScriptPath()
  let port = PY_PORT
  let pyPath = getPythonPath()
  
  console.log('script: ', script)
  console.log('pyPath: ', pyPath)
  console.log('port: ', port)
  if (guessPackaged()) {
    pyProc = require('child_process').execFile(script, [port])
  } else {
    pyProc = require('child_process').spawn(pyPath, [script, port])
  }

  if(pyProc != null) {
    console.log('child process success on port ' + port)
  }
}

const exitPyProc = () => {
  pyProc.kill()
  pyProc = null
}

app.on('ready', createPyProc)
app.on('will-quit', exitPyProc)

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
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'build/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools()
  }
}

/** 使用python-shell替代child_process时
const OS = process.platform;

if (process.env.NODE_ENV === "development") {
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
  if (OS === 'darwin') {
    let script = path.join(__dirname, 'pydist', 'app', 'app');
    pyProc = require('child_process').execFile(script, [port])
  }
}
*/

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

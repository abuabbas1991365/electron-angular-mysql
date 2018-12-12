"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
const os=require('os');
const fs=require('fs');
const ipc=electron_1.ipcMain;
const shell=electron_1.shell;
const BrowserWindow =electron_1.BrowserWindow
var win, serve;
var args = process.argv.slice(1);
require("./Server/server");

function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height
    });
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/node_modules/electron")
        });
        win.loadURL('http://192.168.1.197:3000');  
    }
    else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    }
    win.webContents.openDevTools();
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map
var mainWindow = null;

ipc.on("print-to-pdf", (event, content) => {
 mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false,
    show: true,
  });
  mainWindow.setMenu(null);
  var manid='maniverlx';
  var html = [
    "<body>",
        "<div id='prrerer' 'style=border-style:solid; width: 40%' >",
           "<h4 style='margin: 2% 5% 2% 17%;'>main marraige</h4><br>",
            "<h4 style='margin: 2% 5% 2% 17%;'>marraige</h4>",
            '<hr><br>',
              "<table  border='0'>",
             "<tr style='width: 10%'> <td>தேதி:</td><td>"+manid+"</td></tr>",
             "<tr style='width: 10%'> <td>பெயர்:</td><td>printpersonname</td></tr>",
             "<tr style='width: 10%'> <td>ஊர்:</td><td>printcity</td></tr>",
             "<tr style='width: 10%'> <td>பங்களிப்பு தொகை:</td><td></td></tr>",
             " </table>",
               "<hr> By<br>",
               "<h5 style='margin: 2% 5% 2% 17%;'>refulgence inc pvt ltd</h5>",
               "<h5 style='margin: 2% 5% 2% 17%;'>Cell: +91 44 428 36777 / 66777 </h5>",
        " </div>",
         "<button onclick='myFunction()'>Click me</button>",
          "</div>",
      " <script>",
           "function myFunction (){ console.log('hi');const ipcRenderer = require('electron').ipcRenderer;ipcRenderer.send('print-to-pdf1'); }",
      "</script>",

    "</body>",
  ].join("");
  mainWindow.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  mainWindow.openDevTools();
   setTimeout(function(){
          console.log("the time is now", new Date());
         mainWindow.webContents.print({silent: true, printBackground: false, deviceName: ''})
        },2700);
     
  mainWindow.on("closed", function() {
    //    mainWindow = null;
 
  });
   
});
ipc.on('print-to-pdf1',event =>{
    console.log("eeeeee");
      const win =BrowserWindow.fromWebContents(event.sender);
      win.webContents.print({silent: true, printBackground: false, deviceName: ''})
  
  });






const { app, BrowserWindow } = require("electron");
const knex = require("./src/knex/knex.js");
const path = require("path");
const url = require("url");
const { electron } = require("process");
const { ipcMain } = require("electron");
const ejse = require('ejs-electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1320,
    height:960,
    webPreferences: {
      //nodeIntegration: true,
      preload: path.join(__dirname, "src","preload.js"),
    },
  });

  
  let currentTeam = {_id: 1, teamname: 'Adventurous Aardvarks', developertime: 25, usertrust: 25}
  ejse.data('currentTeam', currentTeam)

  win.loadURL(url.pathToFileURL(path.join(__dirname, "src", "boardgame", "index.ejs")).toString());
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("synchronous-message", (event, args) => {
  console.log(args);
  event.returnValue = "sync pong";
});

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log(arg);

  event.sender.send("asynchronous-reply", "async pong");
});

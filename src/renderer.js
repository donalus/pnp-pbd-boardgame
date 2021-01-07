// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

console.log("Hello?");

const {ipcrenderer, ipcRenderer} = require('electron')

console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping'))

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg)
})

ipcRenderer.send('asynchronous-message', 'async ping')
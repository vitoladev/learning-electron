const { app, BrowserWindow } = require('electron');

require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  })
  window.loadFile('index.html');

  window.on('ready-to-show', () => {
    window.webContents.send('currencies');
    window.show();
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

const { app, BrowserWindow } = require('electron');

require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

async function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    },
    show: false
  })
  win.loadFile('index.html');

  win.once('ready-to-show', async () => {
    win.webContents.send('currencies');
    win.show();
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

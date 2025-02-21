const { app, BrowserWindow, dialog } = require("electron/main");
const { autoUpdater } = require("electron-updater");
const path = require("node:path");

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  // Send app version to renderer
  win.webContents.once("did-finish-load", () => {
    win.webContents.send("app-version", app.getVersion());
  });
};

// App Ready
app.whenReady().then(() => {
  createWindow();

  // Check for updates once at startup
  autoUpdater.checkForUpdatesAndNotify();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Handle Window Close
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ----------------------
// AUTO-UPDATE HANDLING
// ----------------------

autoUpdater.on("checking-for-update", () => {
  win.webContents.send("update-checking");
});

autoUpdater.on("update-available", (info) => {
  win.webContents.send("update-available", info);
});

autoUpdater.on("update-not-available", () => {
  win.webContents.send("update-not-available");
});

autoUpdater.on("download-progress", (progress) => {
  win.webContents.send("update-progress", progress);
});

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox(win, {
      type: "info",
      title: "Update Ready",
      message: "A new version is available. Restart to apply updates?",
      buttons: ["Restart", "Later"],
    })
    .then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

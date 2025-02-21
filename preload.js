const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  onAppVersion: (callback) => ipcRenderer.on("app-version", (_, version) => callback(version)),
  onUpdateChecking: (callback) => ipcRenderer.on("update-checking", callback),
  onUpdateAvailable: (callback) => ipcRenderer.on("update-available", (_, info) => callback(info)),
  onUpdateNotAvailable: (callback) => ipcRenderer.on("update-not-available", callback),
  onUpdateProgress: (callback) => ipcRenderer.on("update-progress", (_, progress) => callback(progress)),
  onUpdateDownloaded: (callback) => ipcRenderer.on("update-downloaded", callback),
});

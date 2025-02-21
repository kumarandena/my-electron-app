const information = document.getElementById("info");
const updateStatus = document.getElementById("update-status");
const appVersion = document.getElementById("app-version");

// Display Electron, Node.js, and Chrome versions
// information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

// Listen for the app version from main process
window.electron.onAppVersion((version) => {
  appVersion.innerText = `🆕 App Version: v${version}`;
});

// Listen for update events
window.electron.onUpdateChecking(() => {
  updateStatus.innerText = "🔍 Checking for updates...";
});

window.electron.onUpdateAvailable((info) => {
  updateStatus.innerText = `⬆️ Update available: v${info.version}`;
});

window.electron.onUpdateNotAvailable(() => {
  updateStatus.innerText = "✅ No new updates available.";
});

window.electron.onUpdateProgress((progress) => {
  updateStatus.innerText = `⬇️ Downloading update... ${Math.round(progress.percent)}%`;
});

window.electron.onUpdateDownloaded(() => {
  updateStatus.innerText = "🎉 Update downloaded. Restart to install.";
});

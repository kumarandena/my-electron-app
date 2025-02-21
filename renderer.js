const appVersion = document.getElementById("app-version");
const updateStatus = document.getElementById("update-status");

// ✅ Listen for app version from main process
window.electron.onAppVersion((version) => {
  appVersion.innerText = `🆕 App Version: v${version}`;
});

// ✅ Listen for update events
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

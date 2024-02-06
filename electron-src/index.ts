import { app, BrowserWindow } from "electron"
import serve from "electron-serve"
import path from "path"

const appServe = serve({
  directory: path.join(__dirname, "../src/out")
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  appServe(win).then(() => {
    win.loadURL("app://./index.html");
  });

}

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
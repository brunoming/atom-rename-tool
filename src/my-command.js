import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import UI from 'sketch/ui'

const webviewIdentifier = 'atom-rename-tool.webview'

export default function () {
  const options = {
    title: '',
    identifier: webviewIdentifier,
    width: 240,
    height: 768,
    x: 0,
    y: 0,
    show: false,
    alwaysOnTop: true,
    titleBarStyle: 'hiddenInset',
    useContentSize: true,
    vibrancy: 'sidebar',
    shouldKeepAround: true,
    onlyShowCloseButton: true,
    frame: false,
    fullscreenable: false,
    resizable: false,
  }

  const browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded to avoid a white flash
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('面板已加载')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', s => {
    UI.message(s)
    var selection = document.selectedLayers
    console.log(selection)
    for (var i = 0, len = selection.length; i < len; i++){
      selection[i].name == 'div'
    }
/*     webContents
      .executeJavaScript(`setRandomNumber(${Math.random()})`)
      .catch(console.error) */
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier)
  if (existingWebview) {
    existingWebview.close()
  }
}

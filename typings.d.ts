declare module '@node/electron' {
    var ipcRenderer: { on: Function };
    export { ipcRenderer };
}
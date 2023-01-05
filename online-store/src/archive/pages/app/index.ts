import WrapApp from "../core/wrapComponents";


class App {

    private static container: HTMLElement = document.body;
    private wrapApp: WrapApp;

    constructor() {
        this.wrapApp = new WrapApp();
    }

    run() {
        App.container.append(this.wrapApp.renderWrapApp());
    }
}

export default App;
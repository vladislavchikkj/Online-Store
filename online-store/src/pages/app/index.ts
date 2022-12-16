class App {
    private container: HTMLElement;

    constructor() {
        this.container = document.body;
    }

    run() {
        this.container.innerText = 'Main Pade Application';
        
    }
}

export default App;
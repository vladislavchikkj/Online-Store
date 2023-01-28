import { Header } from './components/header';
import { Footer } from './components/footer';
import { Main } from './components/main';
import { fakeDB } from './modules/external/fakeDB';

class App {
    private fakeDB: fakeDB;

    private header: Header;
    private main: Main;
    private footer: Footer;

    private container: HTMLElement;

    constructor(selector?: string) {
        this.fakeDB = new fakeDB();

        if (selector) this.container = document.querySelector(selector) as HTMLElement;
        else {
            document.body.innerHTML = `<div class="container"></div>`;
            this.container = document.body.children[0] as HTMLElement;
        }
        this.header = new Header(this.container, this.fakeDB);
        this.main = new Main(this.container, this.fakeDB);
        this.footer = new Footer(this.container);
    }
}

export default App;

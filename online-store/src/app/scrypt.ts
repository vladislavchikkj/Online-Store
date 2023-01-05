import Footer from "../archive/pages/core/components/foter";
import MainPage from "../archive/pages/main-page";
import { Header } from "./components/header";
import { IMain, } from "./interfaces/interfaces";
import { Main } from "./components/main";




class App {

    private language: string = "ru";

    private goods: number[] = [];

    private header: Header;
    private main: IMain;
    //private footer = new Footer();


    private container: HTMLElement;

    constructor(selector?: string) {
        if (selector) this.container = document.querySelector(selector) as HTMLElement;
        else {
            document.body.innerHTML = `<div class="container"></div>`;
            this.container = document.body.children[0] as HTMLElement;
        }
        this.header = new Header(this.container);
        this.main = new Main(this.container)
    }
}

export default App;
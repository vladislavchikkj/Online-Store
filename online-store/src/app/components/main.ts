import { IMain } from "../interfaces/interfaces";
import { Catalog } from "../modules/catalog/catalog";
import { StartPage } from "../modules/start-page";
import { ItemPage } from "../modules/item-page/item";
import { fakeDB } from "../modules/external/fakeDB";
import { СashRegister } from "../modules/cart/cash-register"
import { ErrorPage } from "../modules/error-page/error-page";



export class Main {
    private container: HTMLElement;
    private _page: IMain | null = null;
    private hash: string;
    private fakeDB: fakeDB;

    constructor(place: HTMLElement, fakeDB: fakeDB) {
        this.fakeDB = fakeDB;

        this.fakeDB.init().then(() => this._page?.update?.());


        place.insertAdjacentHTML('beforeend', this.generate());


        this.container = document.querySelector('.wrapperCurrentPage') as HTMLElement;

        this.hash = window.location.hash;
        this.changePage();
        this.page = this.hash;
    }

    generate() {
        return `<main class="wrapperCurrentPage"></main>`;
    }


    set page(name: string) {
        this.renderPageByHash();
    }
    changePage() {
        window.addEventListener('hashchange', () => {
            this.renderPageByHash();
        })
    }
    renderPageByHash() {
        const reg = new RegExp(/item-page\/\d/g)
        const hash = window.location.hash.slice(1);
        if (hash === 'start-page' || hash === '') this._page = new StartPage(this.container);
        else if (hash === 'catalog-page') this._page = new Catalog(this.container, this.fakeDB);
        else if (hash === 'cart-page') this._page = new СashRegister(this.container, this.fakeDB);
        else if (reg.test(hash)) this._page = new ItemPage(this.container, hash, this.fakeDB);
        else this._page = new ErrorPage(this.container);
    }
    checkInitialPage() {

    }
}




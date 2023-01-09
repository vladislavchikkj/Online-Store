import { IMain, IPageList } from "../interfaces/interfaces";
import { Catalog } from "../modules/catalog/catalog";
import { StartPage } from "../modules/start-page";
import { BasketPage } from "../modules/basket-page";
import { Cart } from "../modules/cart/cart";



export class Main {
    private container: HTMLElement;
    private _page: IMain | null = null;
    private hash: string;


    constructor(place: HTMLElement) {
        place.innerHTML += this.generate();

        this.container = document.querySelector('.wrapperCurrentPage') as HTMLElement;

        this.hash = 'start-page'
        this.changePage()
        this.page = this.hash;
    }
    generate() {
        return `<main class="wrapperCurrentPage"></main>`;
    }

    set page(name: string) {
        if (name === 'start-page') this._page = new Catalog(this.container);

    }
    changePage() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash === 'start-page') this._page = new StartPage(this.container);
            if (hash === 'catalog-page') this._page = new Catalog(this.container);
            if (hash === 'basket-page') this._page = new Cart(this.container);
        })
    }
}




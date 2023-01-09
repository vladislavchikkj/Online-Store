import { IMain, IPageList, productList } from "../interfaces/interfaces";
import { Catalog } from "../modules/catalog/catalog";
import { StartPage } from "../modules/start-page";
import { BasketPage } from "../modules/basket-page";
import { ItemPage } from "../modules/item-page/item";
import { Loader } from "../modules/catalog/loader";
import { Cart } from "../modules/cart/cart";



export class Main {
    private container: HTMLElement;
    private _page: IMain | null = null;
    private hash: string;
    private loader: Loader;


    constructor(place: HTMLElement) {

        this.loader = new Loader();

        this.loader.requestItems<productList>().then((productsRespond) => {
            window.localStorage.setItem('items', JSON.stringify(productsRespond.products))
        });

        place.innerHTML += this.generate();

        this.container = document.querySelector('.wrapperCurrentPage') as HTMLElement;

        this.hash = window.location.hash
        console.log(this.hash);
        this.changePage()
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
        if (hash === 'start-page') this._page = new StartPage(this.container);
        if (hash === 'catalog-page') this._page = new Catalog(this.container);
        if (hash === 'cart-page') this._page = new Cart(this.container);
        if (reg.test(hash)) this._page = new ItemPage(this.container, hash);
    }
    checkInitialPage() {

    }
}




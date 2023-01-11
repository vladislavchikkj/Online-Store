import { IMain, IPageList, productList, item, updateAction, product } from "../interfaces/interfaces";
import { Catalog } from "../modules/catalog/catalog";
import { StartPage } from "../modules/start-page";
import { ItemPage } from "../modules/item-page/item";
import { Loader } from "../modules/catalog/loader";
import { СashRegister } from "../modules/cart/cash-register"
import { ErrorPage } from "../modules/error-page/error-page";



export class Main {

    private loaded = false;

    private container: HTMLElement;
    private _page: IMain | null = null;
    private hash: string;
    private loader: Loader;

    private itemList: item[] = [];
    private products: product[] = [];

    private cartCountOutput: HTMLElement;
    private cartPriceOutput: HTMLElement;


    constructor(place: HTMLElement) {
        this.loader = new Loader();

        this.loader.requestItems<productList>().then((productsRespond) => {
            this.products = productsRespond.products;

            const localStore = localStorage.getItem('items')

            if (localStore) {
                const idContainer: { id: number, count: number }[] = JSON.parse(localStore);

                this.itemList = idContainer.map((general) => {
                    const finded = this.products.find((product) => product.id === general.id) as product;
                    return {
                        product: finded,
                        count: general.count,
                    }
                });
                localStorage.clear();
            }

            this.updateTotalCart();


            this._page?.inputProducts?.(this.products);
            this._page?.inputActive?.(this.itemList);

        });


        place.insertAdjacentHTML('beforeend', this.generate());

        this.cartCountOutput = document.querySelector('.number-elemenst') as HTMLElement;
        this.cartPriceOutput = document.querySelector('.total-num') as HTMLElement;

        this.container = document.querySelector('.wrapperCurrentPage') as HTMLElement;


        this.container.addEventListener('update', (e: CustomEventInit<updateAction>) => {
            const detail = e.detail as updateAction;

            const action = detail.action;
            if (action === "add") {
                this.itemList.push({
                    product: detail.product as product,
                    count: 1,
                });
            }
            else if (action === "delete") {
                this.itemList = this.itemList.filter((item) => item.product.id !== (detail.product as product).id);
            }
            else if (action === "change_count") {
                this.itemList = detail.product as item[];
            }

            this.updateTotalCart();
        });

        this.hash = window.location.hash;
        this.changePage();
        this.page = this.hash;

        window.addEventListener("unload", () => {
            const idCount = this.itemList.map((item) => {
                return {
                    id: item.product.id,
                    count: item.count,
                }
            });
            localStorage.setItem("items", JSON.stringify(idCount));
        });
    }

    generate() {
        return `<main class="wrapperCurrentPage"></main>`;
    }

    updateTotalCart() {
        this.cartCountOutput.innerText = `${this.itemList.reduce((acc, item) => acc + item.count, 0)}`;
        this.cartPriceOutput.innerText = `${this.itemList.reduce((acc, item) => acc + item.count * item.product.price, 0)}`;
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
        else if (hash === 'catalog-page') this._page = new Catalog(this.container, this.products, this.itemList);
        else if (hash === 'cart-page') this._page = new СashRegister(this.container, this.itemList);
        else if (reg.test(hash)) this._page = new ItemPage(this.container, hash);
        else this._page = new ErrorPage(this.container);
    }
    checkInitialPage() {

    }
}




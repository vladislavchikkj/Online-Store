import { IMain, product, productList } from "../../interfaces/interfaces";
import { Loader } from "./loader";
import { Filter } from "./filter";
import { Products } from "./products";

export class Catalog implements IMain {
    private container: HTMLElement;

    private loader: Loader;
    private filter: Filter;
    private dispay: Products;

    private products: product[] = [];

    constructor(place: HTMLElement) {
        place.innerHTML = this.generate();

        this.container = place.querySelector('.catalog-page') as HTMLElement;

        this.loader = new Loader();
        this.filter = new Filter(this.container);



        this.dispay = new Products(this.container, 'products');

        this.loader.requestItems<productList>().then((productsRespond) => {
            this.products = productsRespond.products;

            this.filter.filterConfig = this.products

            this.dispay.input = this.products;
        });

        this.container.addEventListener('request_filt', (info: CustomEventInit) => {
            this.dispay.input = this.filter.filtrate(this.products);
        });
    }

    generate() {
        return `<div class="catalog-page"></div>`;
    }
} ``
import { IMain, item, product, productList } from "../../interfaces/interfaces";
import { Loader } from "./loader";
import { Filter } from "./filter";
import { Products } from "./products";

export class Catalog implements IMain {
    private container: HTMLElement;

    private loader: Loader;
    private filter: Filter;
    private dispay: Products;

    private products: product[] = [];
    private active: item[];

    constructor(place: HTMLElement, productList: product[], active: item[]) {

        this.products = productList;
        this.active = active;

        place.innerHTML = this.render();

        this.container = place.querySelector('.catalog-page') as HTMLElement;

        this.loader = new Loader();
        this.filter = new Filter(this.container);

        this.dispay = new Products(this.container, this.active);

        this.inputProducts(this.products);
        /*
        this.loader.requestItems<productList>().then((productsRespond) => {
            this.products = productsRespond.products;

            this.filter.filterConfig = this.products

            this.dispay.input = this.products;
        });
        */
        this.container.addEventListener('request_filt', (info: CustomEventInit) => {
            this.dispay.input = this.filter.filtrate(this.products);
        });


    }
    save() { }

    inputProducts(value: product[]): void {
        this.products = value;

        this.filter.filterConfig = this.products

        this.dispay.input = this.products;
    }

    inputActive(value: item[]): void {
        this.active = value;

        this.dispay.activate = value;

        this.filter.filterConfig = this.products

        this.dispay.input = this.products;
    }

    render() {
        return `<div class="catalog-page"></div>`;
    }
} ``
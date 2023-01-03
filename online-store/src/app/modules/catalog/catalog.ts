import { IMain, product, productList } from "../../interfaces/interfaces";
import { Loader } from "./loader";
import { Filter } from "./filter";

export class Catalog implements IMain {
    private container: HTMLElement;

    private loader: Loader;
    private filter: Filter;
    private dispay: string = '';

    constructor(place: HTMLElement) {
        place.innerHTML = this.generate();

        this.container = place.querySelector('.catalog-page') as HTMLElement;

        this.loader = new Loader();
        this.filter = new Filter(this.container);



        this.container.addEventListener('request_filt', (info: CustomEventInit) => {
            const filters = info.detail;

            this.loader.requestItems<productList>().then(((products) => {
                console.log(this.filter.filtrate(products.products));
            }));
        });
    }

    generate() {
        return `<div class="catalog-page"></div>`;
    }
}
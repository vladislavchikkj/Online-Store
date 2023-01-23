import { IFilterCollection, IMain, item, product, productList } from "../../interfaces/interfaces";
import { fakeDB } from "../external/fakeDB";
import { Loader } from "../external/loader";
import { Filter } from "./filter";
import { Products } from "./products";

export class Catalog implements IMain {
    private container: HTMLElement;

    private fakeDB: fakeDB;
    private filter: Filter;
    private dispay: Products;

    constructor(place: HTMLElement, fakeDB: fakeDB) {

        this.fakeDB = fakeDB;

        place.innerHTML = this.render();

        this.container = place.querySelector('.catalog-page') as HTMLElement;

        this.filter = new Filter(this.container, this.fakeDB);

        this.dispay = new Products(this.container, this.fakeDB);

        this.update();

        this.container.addEventListener('request_filt', (info: CustomEventInit) => {
            const filterSet: IFilterCollection = this.filter.filterSet();

            this.dispay.display = this.fakeDB.select(filterSet);
        });
    }
    save() { }

    update() {
        this.filter.filterConfig();

        const filterSet: IFilterCollection = this.filter.filterSet();

        this.dispay.display = this.fakeDB.select(filterSet);
    };

    render() {
        return `<div class="catalog-page"></div>`;
    }
}
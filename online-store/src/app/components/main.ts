import { IMain, IPageList } from "../interfaces/interfaces";
import { Catalog } from "../modules/catalog/catalog";

export class Main {
    private container: HTMLElement;
    private _page: IMain | null = null;

    private pages: IPageList = {
        'catalog': Catalog,
    }


    constructor(place: HTMLElement) {
        place.innerHTML += this.generate();

        this.container = document.querySelector('.wrapperCurrentPage') as HTMLElement;

        this.page = 'catalog';
    }
    generate() {
        return `<main class="wrapperCurrentPage"></main>`;
    }

    set page(name: string) {
        switch (name) {
            case 'catalog': this._page = new Catalog(this.container);
        }
    }


}





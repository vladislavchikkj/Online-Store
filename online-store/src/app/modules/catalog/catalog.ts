import { IMain } from "../../interfaces/interfaces";
import { Filter } from "./filter";

export class Catalog implements IMain {
    private place: HTMLElement;

    private filter: Filter;
    private dispay: string = '';

    constructor(place: HTMLElement) {
        place.innerHTML = this.generate();

        this.place = place.querySelector('.catalog-page') as HTMLElement;

        this.filter = new Filter(this.place);
    }

    generate() {
        return `<div class="catalog-page"></div>`;
    }
}
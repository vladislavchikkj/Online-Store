import { IMain, product, productList } from "../../interfaces/interfaces";

export class BasketPage implements IMain {
    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML = this.generate();

        this.container = place.querySelector('.main-page') as HTMLElement;

    }

    generate() {
        return `
        <div class="basket-page"></div>`;
    }
} 
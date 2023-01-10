import { IMain, product, productList } from "../../interfaces/interfaces";

export class StartPage implements IMain {
    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML = this.render();

        this.container = place.querySelector('.main-page') as HTMLElement;

    }

    render() {
        return `
        <div class="main-page">
            <div class="main-page__box">
                Online-store
                <a href="#catalog-page" class="btn">В каталог</a>
            </div>
            <div class="catalog"></div>
        </div></div>`;
    }
} 
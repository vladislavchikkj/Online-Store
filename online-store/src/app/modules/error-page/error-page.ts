import { IMain, product, productList } from "../../interfaces/interfaces";

export class ErrorPage implements IMain {
    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML = this.render();

        this.container = place.querySelector('.error-page') as HTMLElement;

    }

    render() {
        return `
        <div class="errror-page">
            404
        </div>`;
    }
} 
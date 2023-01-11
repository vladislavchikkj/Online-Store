import { IMain, product, productList } from "../../interfaces/interfaces";

export class ErrorPage implements IMain {
    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML = this.render();

        this.container = place.querySelector('.error-page') as HTMLElement;

    }

    render() {
        return `
        <div class="error-page">
            <div class="error-descr">
                404 Error
            </div>
            <div class="error-subdescr">
                Surry, but this page you are looking for doesn't exist.
            </div>
        </div>`;
    }
} 
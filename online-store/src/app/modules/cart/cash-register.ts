import { IMain, product } from '../../interfaces/interfaces';

import { Cart } from "./cart";

type item = { product: product, count: number };


export class СashRegister implements IMain {
    private link = [];

    private cartContainer: HTMLElement;

    private cart: Cart;

    constructor(place: HTMLElement) {


        place.innerHTML = this.render();

        this.cartContainer = place.querySelector(".basket-page") as HTMLElement;

        this.cart = new Cart(this.cartContainer);
    }

    render(): string {
        return `
            <div class="basket-page">
                
            
                
                </section>
            </div>`;
        //<section class="basket-page__sale sale">
    }

}

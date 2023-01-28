import { IMain } from '../../interfaces/interfaces';
import { fakeDB } from '../external/fakeDB';

import { Cart } from './cart';
import { Reckoning } from './reckoning';

export class СashRegister implements IMain {
    private fakeDB: fakeDB;

    private container: HTMLElement;

    private cart: Cart;
    private reckoning: Reckoning;

    constructor(place: HTMLElement, fakeDB: fakeDB) {
        this.fakeDB = fakeDB;

        place.innerHTML = this.render();

        this.container = place.querySelector('.basket-page') as HTMLElement;

        this.cart = new Cart(this.container, this.fakeDB);

        this.reckoning = new Reckoning(this.container, this.fakeDB);
    }

    update() {
        this.cart.setOutputItems();
    }

    render(): string {
        return `<div class="basket-page"></div>`;
    }
}

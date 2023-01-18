import { fakeDB } from "../modules/external/fakeDB";

export class Header {
    private fakeDB: fakeDB;

    private cartCountOutput: HTMLElement;
    private cartPriceOutput: HTMLElement;

    constructor(place: HTMLElement, fakeDB: fakeDB) {
        this.fakeDB = fakeDB;

        place.insertAdjacentHTML('beforeend', this.render());

        this.cartCountOutput = document.querySelector('.number-elemenst') as HTMLElement;
        this.cartPriceOutput = document.querySelector('.total-num') as HTMLElement;

        document.addEventListener("update", () => {
            this.updateTotalCart();
        });
    }


    render() {
        return `
            <header class="header page__header">

                <a class="header__page-title" href="#start-page">Online store</a>
                <div class="total-bar">Cart total: 
                    <div class="total-num">0</div>
                </div>
                <a class="card card_active" href="#cart-page">
                    <div class="number-elemenst">0</div>
                </a>
                <a class="btn-catalog" href="#catalog-page">Catalog</a>

            </header>
        `;
    }

    updateTotalCart() {
        let count = 0;
        let price = 0;

        this.fakeDB.getSelected().forEach((item) => {
            count += item.count;
            price += item.count * item.product.price;
        });

        this.cartCountOutput.innerText = `${count}`;
        this.cartPriceOutput.innerText = `${price}`;
    }
} 
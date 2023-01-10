import { IMain, product } from '../../interfaces/interfaces';

type item = { product: product, count: number };

type promo = {
    promo: string,
    bonus: number;
}

export class Reckoning {
    private products: item[] = [];

    private addPromoList = [
        {
            promo: 'ABC',
            bonus: 0.15
        },
        {
            promo: 'RS',
            bonus: 0.1
        },
        {
            promo: 'GOOD BOY',
            bonus: 0.3
        },
    ];

    private totalPriceOutput: HTMLElement;
    private promoInput: HTMLInputElement;
    private status: HTMLElement;
    private promoButton: HTMLButtonElement;

    private promoContainer: HTMLElement;

    private FinalPriceOutput: HTMLElement;

    private activePromo: Set<promo> = new Set();

    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.insertAdjacentHTML("beforeend", this.render());

        this.container = place.querySelector(".basket-page") as HTMLElement;

        this.totalPriceOutput = place.querySelector(".reckoning__total-price") as HTMLElement;
        this.promoInput = place.querySelector(".reckoning__promo-input") as HTMLInputElement;
        this.promoButton = place.querySelector(".reckoning__promo-button") as HTMLButtonElement;


        this.status = place.querySelector(".reckoning__status") as HTMLElement;

        this.promoContainer = place.querySelector(".reckoning__promo-container") as HTMLElement;

        this.FinalPriceOutput = place.querySelector(".reckoning__summary") as HTMLElement;

        this.promoInput.addEventListener('input', () => {
            this.promoInput.value = this.promoInput.value.slice(0, 8);
        });

        this.updatePrice();

        this.promoButton.addEventListener('click', () => {
            const promoInput = this.promoInput.value.toUpperCase();

            const index = this.addPromoList.find((value) => value.promo === promoInput);

            if (index) {
                this.activePromo.add(index);
                this.setPromoList();

                this.updatePrice();
            }
            else {
                this.status.hidden = false;
                setTimeout(() => {
                    this.status.hidden = true;
                }, 200)
            }
        })
    }

    updatePrice() {
        const count = this.products.reduce((acc, product) => acc + product.product.price * product.count, 0);

        const discount = Array.from(this.activePromo).reduce((acc, promo) => acc + promo.bonus, 0);

        this.totalPriceOutput.innerText = `On cash register: ${count}$`;
        this.FinalPriceOutput.innerText = `Summary: ${Math.ceil(count * (1 - discount))}$`;

    }

    set input(list: item[]) {
        this.products = list;

        this.updatePrice();
    }


    setPromoList() {
        this.promoContainer.innerHTML = Array.from(this.activePromo).sort()
            .reduce((acc, promo) =>
                acc + `<p class="reckoning__promo-item">${promo.promo}: ${promo.bonus * 100}%</p>`
                , "");
    }


    render(): string {
        return `
            <section class="basket-page__reckoning reckoning">
                <p class="reckoning__total-price">On cash register: 300$</p>
                <p class="reckoning__rules">Input promo-code for discounting</p>
                <label class="reckoning__promo-label">Promo-code: <input type="text" class="reckoning__promo-input"></label>
                <button class="reckoning__promo-button">Active promo</button>
                <p class="reckoning__status" hidden>Wrong promo code</p>
                <div class="reckoning__promo-container"></div>
                <p class="reckoning__summary">Summary: 300$ + fisting</p>
                <button class="reckoning__buy-button">Buy all</button>
            </section>`;
    }

}
/*
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
*/
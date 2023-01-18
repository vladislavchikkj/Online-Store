import { item } from '../../interfaces/interfaces';
import { fakeDB } from '../external/fakeDB';



export class Cart {
    private container: HTMLElement;

    private count = 4;
    private page = 1;

    private fakeDB: fakeDB;
    private itemsPage: item[] = [];


    private countController: HTMLInputElement;
    private pageController: HTMLInputElement;

    constructor(place: HTMLElement, fakeDB: fakeDB) {
        this.fakeDB = fakeDB;

        place.innerHTML = this.render();

        this.container = place.querySelector(".items") as HTMLElement;

        this.countController = place.querySelector('input#max-count') as HTMLInputElement;
        this.pageController = place.querySelector('input#page') as HTMLInputElement;

        this.setOutputItems();

        this.addCountHandler();


        this.countController.addEventListener('input', () => {
            this.pageController.max = `${Math.ceil(this.fakeDB.getSelected().length / this.count)}`;
            this.setOutputItems();
        });

        this.pageController.addEventListener('input', () => {
            this.setOutputItems();
        });
    }

    setOutputItems() {
        this.count = +this.countController.value;
        this.page = +this.pageController.value - 1;

        this.itemsPage = this.fakeDB.getSelected().slice(this.count * this.page, this.count * (this.page + 1));

        this.container.innerHTML = this.itemsPage.reduce((acc, item, index) => acc + this.createItem(item, index + this.page * this.count), "");
    }

    render(): string {
        return `
            <section class="basket-page__cart cart">
                <header class="cart__header">
                    <h2 class="cart__title">Товары в корзине</h2>
                    <div class = "cart__paginator">
                        <label>Max: <input type = "number" class="cart__settings-pagination" min = 2 max = 7 value = 4 id="max-count"></label>
                        <label>Page: <input type = "number" class="cart__settings-pagination" min = 1 max = 100 value = 1 id="page"></label>
                    </div>
                </header>
                <div class="cart__items items"></div>
            </section>`;
    }

    createItem(item: item, index = 0) {
        return `
            <aside class="items__item item" data-id = ${item.product.id} data-index=${index + 1}>
                <div class="item__index-place">
                    <span class="item__index">${index + 1}</span>
                </div>
                <img src="${item.product.images[0]}" alt="${item.product.title}" class="item__image">
                <div class="item__informations">
                    <h4 class="item__title">${item.product.title}</h4>
                    <p class="item__decription">${item.product.description}</p>
                </div>
                <div class="item__count-container">
                    <p class="item__count">На складе:  ${item.product.stock}</p>
                    <div class="item__count-controller">
                        <button class="item__count-button" value="+">+</button>
                        <span class="item__count-output">${item.count}</span>
                        <button class="item__count-button" value="-">-</button>
                    </div>
                    <p class="item__price">Цена: ${item.product.price * item.count}</p>
                </div>
            </aside>
            `
    }
    addCountHandler() {
        this.container.addEventListener('click', (e) => {
            const itemCard = (e.target as HTMLElement).closest<HTMLElement>(".item");

            if (!itemCard) return;

            const id = +(itemCard.dataset.id as string);

            const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button");

            if (button) {

                if (button.value === "+") {
                    this.fakeDB.updateCount(id, +1);

                }
                else if (button.value === "-") {
                    this.fakeDB.updateCount(id, -1);
                }

                const max = Math.ceil(this.fakeDB.getSelected().length / this.count);
                this.page = +this.pageController.value;

                this.pageController.max = `${max}`;

                this.pageController.value = (this.page > max) ? `${max}` : `${this.page}`;

                this.setOutputItems();
            }
            else {
                window.location.hash = id ? `item-page/${id}` : '1';
            }
        });
    }



}

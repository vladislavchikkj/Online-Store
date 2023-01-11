import { IMain, product, item, updateAction } from '../../interfaces/interfaces';



export class Cart {
    private container: HTMLElement;

    private count = 4;
    private page = 1;

    private productsSource: item[] = [];

    private products: item[] = [];

    private countController: HTMLInputElement;
    private pageController: HTMLInputElement;



    constructor(place: HTMLElement) {
        this.productsSource = [];

        this.products = this.productsSource;

        place.innerHTML = this.render();

        this.container = place.querySelector(".items") as HTMLElement;

        this.countController = place.querySelector('input#max-count') as HTMLInputElement;
        this.pageController = place.querySelector('input#page') as HTMLInputElement;

        this.setOutputItems();

        this.addCountHandler();


        this.countController.addEventListener('input', () => {
            this.pageController.max = `${Math.ceil(this.productsSource.length / this.count)}`;
            this.setOutputItems();
        });

        this.pageController.addEventListener('input', () => {
            this.setOutputItems();
        });

    }

    set input(list: item[]) {
        this.productsSource = list || this.productsSource;

        this.pageController.max = `${Math.ceil(this.productsSource.length / this.count)}`;
        this.pageController.value = `1`;

        this.setOutputItems();
    }

    get output(): item[] {
        return this.productsSource;
    }

    setOutputItems() {
        this.count = +this.countController.value;
        this.page = +this.pageController.value - 1;

        this.products = this.productsSource.slice(this.count * this.page, this.count * (this.page + 1));

        this.container.innerHTML = this.products.reduce((acc, item, index) => acc + this.createItem(item, index + this.page * this.count), "");
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
            const item = (e.target as HTMLElement).closest<HTMLElement>(".item");

            if (!item) return;

            let index = +(item.dataset.index as string) - 1;
            const id = +(item.dataset.id as string);

            const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button");

            if (button) {
                let product: item;


                const prodID = this.productsSource[index].product.id;

                if (id === prodID) product = this.productsSource[index];
                else product = this.productsSource.find((item) => item.product.id === id) as item;

                if (button.value === "+") {
                    product.count += 1;

                }
                else if (button.value === "-") {
                    product.count -= 1;
                }

                this.productsSource = this.productsSource.filter((item) => (item.count > 0));

                this.pageController.max = `${Math.ceil(this.productsSource.length / this.count)}`;

                this.setOutputItems();

                this.container.dispatchEvent(new CustomEvent('update', {
                    bubbles: true,
                    detail: { product: this.productsSource, action: "change_count" },
                }));
            }
        })
    }
}

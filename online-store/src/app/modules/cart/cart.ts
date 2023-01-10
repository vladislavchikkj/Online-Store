import { IMain, product } from '../../interfaces/interfaces';

type item = { product: product, count: number };


export class Cart implements IMain {
    private container: HTMLElement;


    private count = 4;
    private page = 1;

    private _productsSource: item[] = [
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 1,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 3,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 5,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 7,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 9,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 11,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 13,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 15,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
    ];

    private _products: item[] = [];

    private countController: HTMLInputElement;
    private pageController: HTMLInputElement;



    constructor(place: HTMLElement) {
        const storagedProd = localStorage.getItem('carded') as string;

        if (storagedProd) this._productsSource = JSON.parse(storagedProd) as Array<item>;

        this._products = this._productsSource;

        place.innerHTML = this.render();

        this.container = place.querySelector(".items") as HTMLElement;

        this.countController = place.querySelector('input#max-count') as HTMLInputElement;
        this.pageController = place.querySelector('input#page') as HTMLInputElement;

        this.setOutputItems();

        this.addCountHandler();


        this.countController.addEventListener('input', () => {
            this.pageController.max = `${Math.ceil(this._productsSource.length / this.count)}`;
            this.setOutputItems();
        });

        this.pageController.addEventListener('input', () => {
            this.setOutputItems();
        });

    }

    setOutputItems() {
        this.count = +this.countController.value;
        this.page = +this.pageController.value - 1;

        this._products = this._productsSource.slice(this.count * this.page, this.count * (this.page + 1));

        this.container.innerHTML = this._products.reduce((acc, item, index) => acc + this.createItem(item, index + this.page * this.count), "");
    }


    render(): string {
        return `
            <section class="basket-page__cart cart">
                <header class="cart__header">
                    <h2 class="cart__title">Товары в корзине</h2>
                    <div class = "cart__paginator">
                        <label>Max: <input type = "number" class="cart__settings-pagination" min = 2 max = 7 value = 4 id="max-count"></label>
                        <label>Page: <input type = "number" class="cart__settings-pagination" min = 1 max = ${this._products.length / this.count} value = 1 id="page"></label>
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
                    <p class="item__decription">${item.product.decription}</p>
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


                const prodID = this._productsSource[index].product.id;

                if (id === prodID) product = this._productsSource[index];
                else product = this._productsSource.find((item) => item.product.id === id) as item;

                product.count = (button.value === '+') ? product.count + 1 : product.count - 1;

                this._productsSource = this._productsSource.filter((item) => (item.count > 0));

                this.pageController.max = `${Math.ceil(this._productsSource.length / this.count)}`;

                this.setOutputItems();
            }
        })
    }
}

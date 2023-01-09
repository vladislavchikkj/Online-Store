import { IMain, product } from '../../interfaces/interfaces';

type item = { product: product, count: number };


export class Cart implements IMain {
    private container: HTMLElement;

    private _products: item[] = [
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
    ];

    constructor(place: HTMLElement) {
        const storagedProd = localStorage.getItem('carded') as string;

        if (storagedProd) this._products = JSON.parse(storagedProd) as Array<item>;

        place.innerHTML = this.render();

        this.container = place.querySelector(".items") as HTMLElement;

        this.insertItems();
    }

    render(): string {
        return `
            <div class="basket-page">
                <section class="basket-page__cart">
                    <header class="basket-page__header">
                        <h2 class="basket-page__title">Товары в корзине</h2>
                        
                    </header>
                    <div class="basket-page__items items">
                    </div>
                </section>
                <section class="basket-page__sale">

                </section>
            </div>`;
    }
    insertItems() {
        this.container.innerHTML = this._products.reduce((acc, item, index) => acc + this.createItem(item, index), "");
    }
    createItem(item: item, index = 0) {
        return `
            <aside class="items__item item" data-id = ${item.product.id} data-index=${index}>
                <div class="item__index-place">
                    <span class="item__index">${index}</span>
                </div>
                <img src="${item.product.images[0]}" alt="${item.product.title}" class="item__image">
                <div class="item__informations">
                    <h4 class="item__title">${item.product.title}</h4>
                    <p class="item__decription">${item.product.decription}</p>
                </div>
                <div class="item__count-container">
                    <p class="item__count">${item.product.stock}</p>
                    <div class="item__count-controller">
                        <button class="item__count-button button+">+</button>
                        <span class="item__count-output">1</span>
                        <button class="item__count-button button">-</button>
                    </div>
                    <p class="item__price">${item.product.price}</p>
                </div>
            </aside>
            `
    }
}

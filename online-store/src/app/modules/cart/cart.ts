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

        place.innerHTML = this.generate();

        this.container = place;
    }

    generate(): string {
        return `
            <div class="basket-page">
                <section class="basket-page__cart">
                    <header class="basket-page__header">
                        <h2 class="basket-page__title">Товары в корзине</h2>
                        
                    </header>
                </section>
                <section class="basket-page__sale">

                </section>
            </div>`;
    }

}

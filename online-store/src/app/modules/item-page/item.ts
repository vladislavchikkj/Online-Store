import { IMain, product } from '../../interfaces/interfaces';
import { fakeDB } from '../external/fakeDB';

export class ItemPage implements IMain {
    //private ID: string;

    private container: HTMLElement;

    private dataId: number;

    private product: product | undefined;
    private fakeDB: fakeDB;
    private added = false;

    protected imageCard: HTMLElement | null = null;
    private currImageCard: HTMLElement | null = null;
    private addButton: HTMLButtonElement | null = null;

    constructor(place: HTMLElement, dataId: string, fakeDB: fakeDB) {
        place.innerHTML = this.render();

        this.fakeDB = fakeDB;

        this.container = place.querySelector('.item-page') as HTMLElement;

        this.dataId = +dataId.split('/')[1];

        this.update();
    }

    update() {
        this.product = this.fakeDB.findFromAll(this.dataId);

        if (!this.product) return;

        this.added = !!this.fakeDB.find(this.dataId);

        this.container.innerHTML = this.generateItem();

        this.imageCard = this.container.querySelector('.inactive-image-wrapper') as HTMLElement;
        this.currImageCard = this.container.querySelector('.item-image-current') as HTMLElement;
        this.addButton = this.container.querySelector('.add-button') as HTMLButtonElement;

        this.imageCard.addEventListener('click', (e) => {
            const item = e.target as HTMLElement;
            (this.currImageCard as HTMLElement).style.backgroundImage = `${item.style.backgroundImage}`;
        });

        this.addButton.addEventListener('click', () => {
            if (!this.added) {
                this.fakeDB.add(this.dataId);
            } else {
                this.fakeDB.delete(this.dataId);
            }

            this.added = !this.added;

            const buttomText = !this.added ? 'Add to cart' : 'Delete from cart';
            (this.addButton as HTMLButtonElement).innerText = buttomText;
        });
    }

    render() {
        return `<div class="item-page"></div>`;
    }

    generateItem() {
        if (!this.product) return ``;

        const images = Array.from(this.product.images);

        images.length = 3;

        const slides = images.reduce(
            (slider, image) => slider + `<div class="item-image" style="background-image: url(${image})"></div>`,
            ''
        );

        const buttonName = !this.added ? 'Add to cart' : 'Delete from cart';

        return `            
            <div class="item-page__path">store  &nbsp &#8594 &nbsp ${this.product.category} &#8594 &nbsp${this.product.brand} &#8594 &nbsp${this.product.title}</div>
                <div class="item-page__wrapper">
                <div class="wrapper-blocks">
                    <div class="curr-image-wrapper">
                        <div class="item-image-current" style="background-image: url(${this.product.images[0]})"></div>
                    </div>
                    <div class="inactive-image-wrapper">
                        ${slides}
                    </div>
                    

                    </div>
                    <div class="item-text-wrap">
                        <div class="title">${this.product.title}</div>
                        <div class="descr">Description: ${this.product.description}</div>
                        <div class="discount">Discount Percentage: ${this.product.discountPercentage}</div>
                        <div class="rating">Rating: ${this.product.rating}</div>
                        <div class="stock">Stock: ${this.product.stock}</div>
                        <div class="brand">Brand: ${this.product.brand}</div>
                        <div class="category">Category: ${this.product.category}</div>
                        <div class="total">
                            <div class="total-price">Price: $1000</div>
                            <div class="total-btn">
                                <button class = "add-button">${buttonName}</button>
                                <button>Buy now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

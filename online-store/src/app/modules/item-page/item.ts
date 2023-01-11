import { IMain, product, productList } from "../../interfaces/interfaces";
import { Products } from "../catalog/products";
import { Loader } from "../catalog/loader";

export class ItemPage implements IMain {
    private productList: product[] = [];

    private productItem: product;
    //private ID: string;

    private container: HTMLElement;
    private dataId: number;
    protected imageCard: HTMLElement;
    private currImageCard: HTMLElement;

    constructor(place: HTMLElement, dataId: string, products: product[]) {
        this.productList = products;

        this.container = place.querySelector('.item-page') as HTMLElement;

        console.log(dataId)

        this.dataId = +dataId.split('/')[1];



        this.productItem = this.productList.find((el) => +el.id === +this.dataId) as product;

        console.log(this.productItem)

        place.innerHTML = this.render();

        this.imageCard = place.querySelector('.inactive-image-wrapper') as HTMLElement;
        this.currImageCard = place.querySelector('.item-image-current') as HTMLElement;

        this.imageCard.addEventListener('click', (e) => {
            let item = (e.target as HTMLElement);
            this.currImageCard.style.backgroundImage = `${item.style.backgroundImage}`
        });
    }

    render() {




        // const currentItem = array[].this
        return `
        <div class="item-page">
            <div class="item-page__path">store  &nbsp &#8594 &nbsp ${this.productItem.category} &#8594 &nbsp${this.productItem.brand} &#8594 &nbsp${this.productItem.title}</div>
            <div class="item-page__wrapper">
            <div class="wrapper-blocks">
                <div class="curr-image-wrapper">
                    <div class="item-image-current" style="background-image: url(${this.productItem.images[0]})"></div>
                </div>
                <div class="inactive-image-wrapper">
                    <div class="item-image" style="background-image: url(${this.productItem.images[1]})"></div>
                    <div class="item-image" style="background-image: url(${this.productItem.images[2]})"></div>
                    <div class="item-image" style="background-image: url(${this.productItem.images[3]})"></div>
                </div>
                

                </div>
                <div class="item-text-wrap">
                    <div class="title">${this.productItem.title}</div>
                    <div class="descr">Description: ${this.productItem.description}</div>
                    <div class="discount">Discount Percentage: ${this.productItem.discountPercentage}</div>
                    <div class="rating">Rating: ${this.productItem.rating}</div>
                    <div class="stock">Stock: ${this.productItem.stock}</div>
                    <div class="brand">Brand: ${this.productItem.brand}</div>
                    <div class="category">Category: ${this.productItem.category}</div>
                    <div class="total">
                        <div class="total-price">Price: $1000</div>
                        <div class="total-btn">
                            <button>Add to card</button>
                            <button>Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>`;
    }
} 
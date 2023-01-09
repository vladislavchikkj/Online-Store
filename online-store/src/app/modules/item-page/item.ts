import { IMain, product, productList } from "../../interfaces/interfaces";
import { Products } from "../catalog/products";

export class ItemPage implements IMain {
    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML = this.generate();

        this.container = place.querySelector('.item-page') as HTMLElement;

    }

    generate() {
        return `
        <div class="item-page">
            <div class="item-page__path">brand --> smartphone --> apple</div>
            <div class="item-page__wrapper">
                <div class="item-image" style="background-image: url(https://i.dummyjson.com/data/products/1/thumbnail.jpg)" >

                </div>
                <div class="item-text-wrap">
                    <div class="title">Iphone 9</div>
                    <div class="descr">Description: An apple mobile which is nothing like apple</div>
                    <div class="discount">Discount Percentage: 123</div>
                    <div class="rating">Rating: 123213</div>
                    <div class="stock">Stock: 12321</div>
                    <div class="brand">Brand: Apple</div>
                    <div class="category">Category: Smart</div>
                    <div class="total">
                        <div class="total-price">1000</div>
                        <div class="total-btn">
                            <button>Add to card</button>
                            <button>Buy now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
} 
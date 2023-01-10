import { IMain, product, productList } from "../../interfaces/interfaces";
import { Products } from "../catalog/products";
import { Loader } from "../catalog/loader";

export class ItemPage implements IMain {
    private container: HTMLElement;
    private dataId: number;
    protected imageCard: HTMLElement;
    private currImageCard: HTMLElement;

    constructor(place: HTMLElement, dataId: string) {

        this.container = place.querySelector('.item-page') as HTMLElement;

        this.dataId = +dataId.split('/')[1];

        place.innerHTML = this.render();

        this.imageCard = place.querySelector('.inactive-image-wrapper') as HTMLElement;
        this.currImageCard = place.querySelector('.item-image-current') as HTMLElement;

        this.imageCard.addEventListener('click', (e) => {
            let item = (e.target as HTMLElement);
            this.currImageCard.style.backgroundImage = `${item.style.backgroundImage}`
        });
    }

    render() {
        const itemsJSON = window.localStorage.getItem('items') || `[]`

        const items: product[] = JSON.parse(itemsJSON)

        const currItem = items.filter((el) => el.id === this.dataId)



        // const currentItem = array[].this
        return `
        <div class="item-page">
            <div class="item-page__path">store  &nbsp &#8594 &nbsp ${currItem[0].category} &#8594 &nbsp${currItem[0].brand} &#8594 &nbsp${currItem[0].title}</div>
            <div class="item-page__wrapper">
            <div class="wrapper-blocks">
                <div class="curr-image-wrapper">
                    <div class="item-image-current" style="background-image: url(${currItem[0].images[0]})"></div>
                </div>
                <div class="inactive-image-wrapper">
                    <div class="item-image" style="background-image: url(${currItem[0].images[1]})"></div>
                    <div class="item-image" style="background-image: url(${currItem[0].images[2]})"></div>
                    <div class="item-image" style="background-image: url(${currItem[0].images[3]})"></div>
                </div>
                

                </div>
                <div class="item-text-wrap">
                    <div class="title">${currItem[0].title}</div>
                    <div class="descr">Description: ${currItem[0].description}</div>
                    <div class="discount">Discount Percentage: ${currItem[0].discountPercentage}</div>
                    <div class="rating">Rating: ${currItem[0].rating}</div>
                    <div class="stock">Stock: ${currItem[0].stock}</div>
                    <div class="brand">Brand: ${currItem[0].brand}</div>
                    <div class="category">Category: ${currItem[0].category}</div>
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
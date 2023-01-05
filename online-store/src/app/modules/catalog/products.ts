import { Loader } from "./loader"
import { product } from "../../interfaces/interfaces"
import { productList } from "../../interfaces/interfaces"


export class Products {
    protected container: HTMLElement;

    private products: product[] = [];

    constructor(place: HTMLElement, id: string) {
        place.insertAdjacentHTML('beforeend', this.generate());

        this.container = place.querySelector('.products__items') as HTMLElement;
        console.log(this.container)
    }

    generate = () => `
        <div class="products">
            <div class="products__sort">
                <div class="sort-bar">Sort options</div>
                <div class="stat">Found: 100</div>
                <div class="total-bar">Cart total</div>
                <div class="view-mode">
                    <div class="big-v active-mode"></div>
                    <div class="small-v"></div>
                </div>
            </div>
            <div class="products__items">
            </div>
        </div>
        `

    set input(items: product[]) {
        this.products = items;

        this.output();
    }

    public output() {
        this.container.innerHTML = this.products.reduce((result, item) => result += this.createItem(item), '');
    }

    createItem = (item: product) => `
        <div class="item-card" data-id = "${item.id}">
            <div class="item__wrapper">
                <div class="wrapper__title">${item.title}</div>
                <div class="item__img" style="background-image: url(${item.images[0]})"></div>
            </div>

            <div class="item__buttons">
                <button class="buttons__add" onclick="editItem()">Add</button>
                <button class="buttons__detail" onclick="detailItem())">Detail</button>
            </div>
        </div>
    `
}
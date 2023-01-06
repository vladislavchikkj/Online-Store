import { Loader } from "./loader"
import { product } from "../../interfaces/interfaces"
import { productList } from "../../interfaces/interfaces"


export class Products {
    protected container: HTMLElement;
    protected panel: HTMLElement;
    protected myDropdown: HTMLElement;
    protected back: HTMLElement;

    private products: product[] = [];

    constructor(place: HTMLElement, id: string) {
        place.insertAdjacentHTML('beforeend', this.generate());

        this.container = place.querySelector('.products__items') as HTMLElement;
        this.panel = place.querySelector('.dropdown') as HTMLElement;
        this.myDropdown = place.querySelector('.dropdown-content') as HTMLElement;
        this.back = place.querySelector('.products') as HTMLElement;

        this.panel.addEventListener('click', () => {
            console.log('click');
            this.createSortOptionMenu()
        });

        document.addEventListener('click', (e) => {
            this.closeSortOptionMenu(e);
        });
    }

    generate = () => `
        <div class="products">
            <div class="products__sort">
                <div class="dropdown">
                    <button class="dropbtn">Sort options</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a href="#">Sort by price</a>
                        <a href="#">Sort by rating</a>
                    </div>
                </div>
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

    public output(): void {
        this.container.innerHTML = this.products.sort()
            .reduce((acc, item) => acc + this.createItem(item), '');
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
    createSortOptionMenu() {
        this.myDropdown.classList.toggle("show");
    }

    closeSortOptionMenu(event: any) {    // any type change!
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}
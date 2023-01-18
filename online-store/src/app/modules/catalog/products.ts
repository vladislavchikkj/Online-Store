import { item, product } from "../../interfaces/interfaces";
import { fakeDB } from "../external/fakeDB";

interface ISort {
    (a: product, b: product): number
}

export class Products {
    protected container: HTMLElement;
    protected panel: HTMLElement;
    protected dropMenu: HTMLElement;
    protected back: HTMLElement;
    protected searchForm: HTMLInputElement;

    private fakeDB: fakeDB;
    private displayed: product[] = [];


    private sortOption: ISort | undefined;
    private seachResult: HTMLInputElement | undefined;
    private foundItemsPlace: HTMLElement;
    private foundItems: number;
    private items: HTMLElement;
    private currItems: HTMLElement;
    private sizeItemBtn: HTMLElement;
    private choisedBox: Set<number>;
    /*
    private totalBox: number;
    private sumItemBox: number;
    private cardSumItem: HTMLElement;
    private totalBar: HTMLElement;
    */

    constructor(place: HTMLElement, fakeDB: fakeDB) {
        this.fakeDB = fakeDB;


        this.foundItems = 30;

        place.insertAdjacentHTML('beforeend', this.generate());

        this.choisedBox = new Set(this.fakeDB.getSelected().map((item) => item.id));

        this.container = place.querySelector('.products__items') as HTMLElement;
        this.panel = place.querySelector('.dropdown') as HTMLElement;
        this.dropMenu = place.querySelector('.dropdown-content') as HTMLElement;
        this.back = place.querySelector('.products') as HTMLElement;
        this.searchForm = place.querySelector('.search-form__input') as HTMLInputElement;
        this.foundItemsPlace = place.querySelector('.found') as HTMLElement;
        this.items = place.querySelector('.products__items') as HTMLElement;
        this.currItems = place.querySelector('.item-card') as HTMLElement;
        this.sizeItemBtn = place.querySelector('.view-mode') as HTMLElement;


        this.sizeItemBtn.addEventListener('click', (e) => {
            let btn = (e.target as HTMLElement);
            if (btn.className === 'big-v') {
                this.items.classList.add('active');
            }
            else if (btn.className === 'small-v') {
                this.items.classList.remove('active');
            }

        });
        this.items.addEventListener('click', (e) => {
            const item = (e.target as HTMLElement).closest<HTMLElement>('.item__wrapper');
            const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.buttons__i');

            if (item) {
                const ID = item.dataset.id as string
                window.location.hash = ID ? `item-page/${ID}` : 'error-page'
            };


            if (btn?.name === "add") {
                const ID: number = +(btn.dataset.id as string);

                if (!this.choisedBox.has(ID)) {
                    this.choisedBox.add(ID);
                    this.fakeDB.add(ID);
                }
                else {
                    this.choisedBox.delete(ID);
                    this.fakeDB.delete(ID);
                }

                btn.classList.toggle('drop');
                btn.textContent = (!btn.classList.contains('drop')) ? 'Add' : 'Drop';

            }
            else if (btn?.name === "details") {
                const ID = btn.dataset.id as string;

                window.location.hash = ID ? `item-page/${ID}` : '1';
            }
        });

        this.panel.addEventListener('click', () => {
            this.toggleSortOptionMenu()
        });

        this.dropMenu.addEventListener('click', (e) => {
            const selected = (e.target as HTMLElement).closest('.sort-option');
            const sortOptionSt = (selected as HTMLElement).dataset.sort as string;

            this.sortOption = this.sortSelect(sortOptionSt);
            this.output();
        });

        document.addEventListener('click', (e) => {
            this.closeSortOptionMenu(e);
        });

        this.addHandler(this.searchForm);
    }

    private sortSelect(option: string): ISort {
        if (option === 'rating')
            return (a, b) => b.rating - a.rating;
        return (a, b) => a.price - b.price;
    }

    private addHandler(input: HTMLElement) {
        input.addEventListener("input", (e: Event) => {
            this.output();
        });
    }
    protected showFoundItem(found: number) {
        this.foundItemsPlace.innerText = `Found: ${found} `
    }


    generate = () => `
        <div class="products">
            <div class="products__sort">
                <div class="dropdown">
                    <button class="dropbtn">Sort options ↴</button>
                    <div id="myDropdown" class="dropdown-content">
                        <a data-sort="price" class = "sort-option">Sort by price</a>
                        <a data-sort="rating" class = "sort-option">Sort by rating</a>
                    </div>
                </div>
                <div class="found">Found: 30</div>
                <form class="header__search-form search-form">
                    <input class="search-form__input" placeholder="Выберите товар">
                </form>
                <div class="view-mode">
                    <div class="big-v"></div>
                    <div class="small-v"></div>
                </div>
            </div>
            <div class="products__items">
            </div>
        </div>
        `

    set display(products: product[]) {
        this.displayed = products;
        this.output();
    }

    set activate(active: item[]) {
        this.choisedBox = new Set<number>(active.map((item) => item.id));
    }


    public output() {
        const searched = this.searchForm.value.toLocaleLowerCase()

        const output = this.displayed.filter((item) => item.title.toLocaleLowerCase().includes(searched))
            .sort(this.sortOption); // filter there
        this.container.innerHTML = output.reduce((acc, item, index) => acc + this.createItem(item), '');
        this.foundItems = output.length
        this.showFoundItem(output.length);
    }

    createItem = (product: product) => {
        const nameButton = (this.choisedBox.has(product.id)) ? `Drop` : `Add`;
        const dropstyle = (this.choisedBox.has(product.id)) ? `drop` : ``;

        return `<a class="item-card">
            <div class="item__wrapper" data-id = "${product.id}">
                <div class="wrapper__title">${product.title}</div>
                <div class="wrapper__item-info">
                    <div class="wrapper__price">Price: ${product.price}</div>
                    <div class="wrapper__price">Discount: ${product.discountPercentage}</div>
                    <div class="wrapper__price">Rarting: ${product.rating}</div>
                    <div class="wrapper__price">Stock: ${product.stock}</div>
                    <div class="wrapper__price">Brand: ${product.brand}</div>
                    <div class="wrapper__price">Category: ${product.category}</div>
                </div>
                <div class="item__img" style="background-image: url(${product.images[0]})"></div>
            </div>

            <div class="item__buttons">
                <button data-id = "${product.id}" name="add" class="buttons__i ${dropstyle}">${nameButton}</button>
                <button data-id = "${product.id}" name="details" class="buttons__i">Detail</button>
            </div>
        </a>`
    }
    toggleSortOptionMenu() {
        this.dropMenu.classList.toggle("show");
    }

    closeSortOptionMenu(event: Event) {
        const target = (event.target as HTMLElement).closest('.dropbtn');

        if (!target) { this.dropMenu.classList.remove('show'); }
    }
    /*
    get getChoised(): product[] {
        return Array.from(this.itemBox);
    }
    */
}
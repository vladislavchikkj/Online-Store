import { item, product } from "../../interfaces/interfaces";

interface ISort {
    (a: product, b: product): number
}

export class Products {
    protected container: HTMLElement;
    protected panel: HTMLElement;
    protected dropMenu: HTMLElement;
    protected back: HTMLElement;
    protected searchForm: HTMLInputElement;

    private products: product[] = [];
    private sortOption: ISort | undefined;
    private seachResult: HTMLInputElement | undefined;
    private foundItemsPlace: HTMLElement;
    private foundItems: number;
    private items: HTMLElement;
    private currItems: HTMLElement;
    private dataId: string | null;
    private sizeItemBtn: HTMLElement;
    private itemBox: Set<product>;
    private totalBox: number;
    private sumItemBox: number;
    private cardSumItem: HTMLElement;
    private totalBar: HTMLElement;


    constructor(place: HTMLElement, active: item[]) {
        this.foundItems = 30;
        this.dataId = '';
        this.itemBox = new Set();
        this.totalBox = 0;
        this.sumItemBox = 0;
        place.insertAdjacentHTML('beforeend', this.generate());

        this.itemBox = new Set<product>(active.map((item) => item.product));

        this.container = place.querySelector('.products__items') as HTMLElement;
        this.panel = place.querySelector('.dropdown') as HTMLElement;
        this.dropMenu = place.querySelector('.dropdown-content') as HTMLElement;
        this.back = place.querySelector('.products') as HTMLElement;
        this.searchForm = place.querySelector('.search-form__input') as HTMLInputElement;
        this.foundItemsPlace = place.querySelector('.found') as HTMLElement;
        this.items = place.querySelector('.products__items') as HTMLElement;
        this.currItems = place.querySelector('.item-card') as HTMLElement;
        this.sizeItemBtn = place.querySelector('.view-mode') as HTMLElement;
        this.cardSumItem = document.querySelector('.number-elemenst') as HTMLElement;
        this.totalBar = document.querySelector('.total-num') as HTMLElement;


        this.sizeItemBtn.addEventListener('click', (e) => {
            let btn = (e.target as HTMLElement);
            if (btn.className === 'big-v') {
                this.items.classList.add('active');
            }
            if (btn.className === 'small-v') {
                this.items.classList.remove('active');
            }

        });
        this.items.addEventListener('click', (e) => {
            const item = (e.target as HTMLElement).closest('.item__wrapper');

            if (item !== null) {
                this.dataId = item.getAttribute('data-id') as string
                window.location.hash = this.dataId ? `item-page/${this.dataId}` : 'error-page'
            };

            let btn = (e.target as HTMLElement).closest('.buttons__i');

            if (btn?.getAttribute('data-id')) {
                this.dataId = btn.getAttribute('data-id') as string;

                const index = +(btn.getAttribute('data-index') as string);
                const product = this.products[index];

                if (!this.itemBox.has(product)) {
                    this.itemBox.add(product);
                    this.container.dispatchEvent(new CustomEvent('update', {
                        bubbles: true,
                        detail: { product: product, action: "add" },
                    }));

                }
                else if (btn.classList.contains('drop')) {
                    this.itemBox.delete(product);
                    this.container.dispatchEvent(new CustomEvent('update', {
                        bubbles: true,
                        detail: { product: product, action: "delete" },
                    }));
                }

                btn.classList.toggle('drop');
                btn.textContent = (!btn.classList.contains('drop')) ? 'Add' : 'Drop';

            }
            else if (btn?.getAttribute('detailData-id')) {
                this.dataId = btn.getAttribute('detailData-id') as string
                window.location.hash = this.dataId ? `item-page/${this.dataId}` : '1'
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

    set input(items: product[]) {


        this.products = items;
        this.output();
    }

    set activate(active: item[]) {
        this.itemBox = new Set<product>(active.map((item) => item.product));
    }


    public output(): void {
        const output = this.products.filter(item =>
            item.title.toLocaleLowerCase().includes(this.searchForm.value.toLocaleLowerCase())
        ).sort(this.sortOption); // filter there
        this.container.innerHTML = output.reduce((acc, item, index) => acc + this.createItem(item, index), '');
        this.foundItems = output.length
        this.showFoundItem(output.length);
    }

    createItem = (item: product, index: number) => {
        const nameButton = (this.itemBox.has(item)) ? `Drop` : `Add`;
        const dropstyle = (this.itemBox.has(item)) ? `drop` : ``;

        return `<a class="item-card">
            <div class="item__wrapper" data-id = "${item.id}">
                <div class="wrapper__title">${item.title}</div>
                <div class="wrapper__item-info">
                    <div class="wrapper__price">Price: ${item.price}</div>
                    <div class="wrapper__price">Discount: ${item.discountPercentage}</div>
                    <div class="wrapper__price">Rarting: ${item.rating}</div>
                    <div class="wrapper__price">Stock: ${item.stock}</div>
                    <div class="wrapper__price">Brand: ${item.brand}</div>
                    <div class="wrapper__price">Category: ${item.category}</div>
                </div>
                <div class="item__img" style="background-image: url(${item.images[0]})"></div>
            </div>

            <div class="item__buttons">
                <button data-id = "${item.id}" data-index = "${index}" class="buttons__i ${dropstyle}">${nameButton}</button>
                <button detailData-id = "${item.id}" class="buttons__i">Detail</button>
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

    get getChoised(): product[] {
        return Array.from(this.itemBox);
    }

}
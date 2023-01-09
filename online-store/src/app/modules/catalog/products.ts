import { product } from "../../interfaces/interfaces";

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
    private dataId: string | null;


    constructor(place: HTMLElement, id: string) {
        this.foundItems = 30;
        this.dataId = ''
        place.insertAdjacentHTML('beforeend', this.generate());

        this.container = place.querySelector('.products__items') as HTMLElement;
        this.panel = place.querySelector('.dropdown') as HTMLElement;
        this.dropMenu = place.querySelector('.dropdown-content') as HTMLElement;
        this.back = place.querySelector('.products') as HTMLElement;
        this.searchForm = place.querySelector('.search-form__input') as HTMLInputElement;
        this.foundItemsPlace = place.querySelector('.found') as HTMLElement;
        this.items = place.querySelector('.products__items') as HTMLElement;

        this.items.addEventListener('click', (e) => {
            let item = (e.target as HTMLElement).closest('.item-card');
            if(item !== null) {
                this.dataId = item.getAttribute('data-id')
                console.log(this.dataId);
                window.location.hash = this.dataId ? `item-page/${this.dataId}`: '1'
            };
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

    protected generateItemById() { // this 
        console.log(this.dataId);
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
        const output = this.products.filter(item => 
           item.title.toLocaleLowerCase().includes(this.searchForm.value.toLocaleLowerCase())
        ).sort(this.sortOption); // filter there
        this.container.innerHTML = output.reduce((acc, item) => acc + this.createItem(item), '');
        this.foundItems = output.length
        this.showFoundItem(output.length)
            
        
        
    }
    // href="#item-page"
    createItem = (item: product) => `
        <a class="item-card" data-id = "${item.id}">
            <div class="item__wrapper">
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
                <button class="buttons__add" onclick="editItem()">Add</button>
                <button class="buttons__detail" onclick="detailItem()">Detail</button>
            </div>
        </a>
    `
    toggleSortOptionMenu() {
        this.dropMenu.classList.toggle("show");
    }

    closeSortOptionMenu(event: Event) {
        const target = (event.target as HTMLElement).closest('.dropbtn');

        if (!target) {
            /* У тебя ещё планируются выпадающие штуки?
            const dropdowns = this.panel.querySelectorAll("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].classList.remove('show');
            }
            */
            this.dropMenu.classList.remove('show');
        }
    }
}
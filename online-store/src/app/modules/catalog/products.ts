import { Loader } from "./loader"
import { product } from "../../interfaces/interfaces"
import { productList } from "../../interfaces/interfaces"


class Products {

    protected container: HTMLElement;
    private loader: Loader;



    constructor(id: string) {
        this.container = document.createElement('div')
        this.container.id = id; 
        this.loader = new Loader();
    }

    


    async renderProductElem() {
        const productsArray: productList = await this.loader.requestItems<productList>()
        const items = this.fillPostsList(productsArray.products)
        const productContainer = this.container;
        productContainer.className = 'products'
        productContainer.innerHTML = `
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
            ${items}
        </div>
        `
        
    }

    public fillPostsList = (items: product[]) => {

        let itemsStr = '';
        if (items.length) {
            items.forEach((item) => itemsStr += this.createItem(item));
        }
        return itemsStr;
      }
  
      createItem = (item: product) => `
      <div class="item-card">
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

    render() {
        this.renderProductElem();
        return this.container;
    }
}

export default Products;
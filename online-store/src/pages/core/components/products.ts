<<<<<<< HEAD
import Item, { productList } from "./item";
import Loader from "./loader";
import { product } from "./item";
=======

import { product } from "./item";

>>>>>>> ef0bb520af68e6168ec0cfc097d605b591a2bf18
class Products {

    protected container: HTMLElement;
    protected item: Item;
    private loader: Loader;


    constructor(id: string) {
        this.container = document.createElement('div')
<<<<<<< HEAD
        this.container.id = id; 
        this.loader = new Loader();
        this.item = new Item();
        this.loader.requestItems<productList>().then(((products) => console.log(products.products)));
=======
        this.container.id = id;
>>>>>>> ef0bb520af68e6168ec0cfc097d605b591a2bf18
    }




    renderProductElem() {

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
        </div>
        `

    }

    fillPostsList = (items: product[]) => {
        this.container.innerHTML = "";
       if (items.length) {
          items.forEach((item) => this.container.innerHTML += this.createItem(item));
       }
      }
  
      createItem = (item: product) => `
      <div class="item-card">
        <div class="item__wrapper">
            <div class="wrapper__title">${item.title}</div>
            <div class="item__img" style="background-image: url(${item.images[0]})"></div>
        </div>
  
        <div class="item__buttons">
            <button class="buttons__edit" onclick="editPost()">Edit</button>
            <button class="buttons__delete" onclick="deletePost())">Delete</button>
        </div>
      </div>
    `

    render() {

        this.item.itemList()
        this.renderProductElem()
        return this.container;
    }
}

export default Products;
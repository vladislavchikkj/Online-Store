class Item  {

    protected container: HTMLElement;
    
    private get _domain(): string {
      return 'https://dummyjson.com/products/'
    }
    
    protected state: {} = {
      items: [] = [],
    }

    constructor() {
      this.container = document.createElement('div')

    }
    
  
    public async itemList(): Promise<product[]> {
      let options: RequestInit = this.getRequestOptions('GET');

      let response = await fetch(`${this._domain}`, options)

      if(!response.ok) {
        throw new Error('get error')
      }

      let responseBody: productList = await response.json();
      
      console.log('object', responseBody.products);
      return responseBody.products;
    }
    

    private getRequestOptions(method: string): RequestInit {
      return {
        headers: {
          'Content-type': 'application/json'
        },
        method: method
      }
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

  };

  export type product = {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
  }
  
export type productList = {
  limit: string
  products: product[]
  skip: number
  total: number
}

export default Item;


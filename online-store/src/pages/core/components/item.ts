class Item  {

    protected container: HTMLElement;
    private get _domain(): string {
      return 'https://dummyjson.com/products?limit=10'
    }
    

    constructor() {
      this.container = document.createElement('div')

    }
    
  
    public async itemList(): Promise<void> {
      let options: RequestInit = this.getRequestOptions('GET');

      let response = await fetch(`${this._domain}`, options)

      let responseBody = <Array<ListResponse>>await response.json();
      console.log('object', responseBody);
      return Promise.resolve();
    }

    private getRequestOptions(method: string): RequestInit {
      return {
        headers: {
          'Content-type': 'application/json'
        },
        method: method
      }
    }

  };

interface ListResponse {
  // limit: 10
  // products: []
  // skip: 0
  // total: 100


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
  images: [string]
}

let item = new Item();

async function itemList() {
  await item.itemList();
}

  
export default Item;
  
  
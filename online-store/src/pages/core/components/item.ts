export type product = {
  id: number,
  category: string,
  title: string,
  images: string[],
  decription: string,
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
}

type productList = {
  products: product[];
  total: number,
  skip: number,
  limit: number,
}

/*

*/

class Item {

  protected container: HTMLElement;
  private get _domain(): string {
    return 'https://dummyjson.com/products?limit=10'
  }


  constructor() {
    this.container = document.createElement('div')

  }


  public async itemList(): Promise<product[]> {
    let options: RequestInit = this.getRequestOptions('GET');

    let response = await fetch(`${this._domain}`, options)

    if (!response.ok) {
      throw new Error("oshibka getiing");
    }

    const responseBody: productList = await response.json();

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

};

interface ListResponse {

}

let item = new Item();

async function itemList() {
  await item.itemList();
}


export default Item;


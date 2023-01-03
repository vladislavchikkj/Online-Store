export type product = {
    id: number,
    category: string,
    brand: string,
    title: string,
    images: string[],
    decription: string,
    price: number,
    rating: number,
    stock: number,
    thumbnail: string,
    [index: string]: string | number | string[],
}

export interface Iproduct {
    category: string,
    brand: string,
    [index: string]: string,
}


export type productList = {
    products: product[];
    total: number,
    skip: number,
    limit: number,
}

export interface IComponent {
    render(callback?: () => void): string;
}

export interface IPageList {
    [index: string]: IMain;
}

export interface IMain {

}

export interface IFilterCollection {
    [index: string]: string[];
}
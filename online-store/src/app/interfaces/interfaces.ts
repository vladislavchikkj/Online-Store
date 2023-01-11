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

export type item = {
    product: product,
    count: number
};

export type updateAction = {
    product: product | item[];
    action: "add" | "delete" | "change_count";
}

export interface IComponent {
    render(callback?: () => void): string;
}

export interface IPageList {
    [index: string]: IMain;
}

export interface IMain {
    render(): string

    save?: () => void;

    inputActive?(active: item[], all?: product[]): void;
    inputProducts?(value: product[]): void;

}

export interface IFilterCollection {
    [index: string]: Set<string> | number[]
}
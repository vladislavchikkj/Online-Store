export type product = {
    id: number;
    category: string;
    brand: string;
    title: string;
    images: string[];
    decription: string;
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    [index: string]: string | number | string[];
};

export type item = {
    id: number;
    product: product;
    count: number;
};

export interface Iproduct {
    category: string;
    brand: string;
    [index: string]: string;
}

export type productList = {
    products: product[];
    total: number;
    skip: number;
    limit: number;
};

export type critery = {
    label: string;
    type: string;
    variants?: Set<string>;
    range?: { from: number; to: number };
};

export type criteryList = {
    [index: string]: critery;
};

export type updateTotal = {
    count: number;
    price: number;
};

export type updateAction = {
    product: product | item[];
    action: 'add' | 'delete' | 'change_count';
};

export interface IComponent {
    render(callback?: () => void): string;
}

export interface IPageList {
    [index: string]: IMain;
}

export interface IMain {
    render(): string;

    save?: () => void;

    update?: () => void;

    inputActive?(active: item[], all?: product[]): void;
    inputProducts?(value: product[]): void;
}

export interface IFilterCollection {
    [index: string]: Set<string> | number[];
}

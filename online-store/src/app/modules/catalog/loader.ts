export class Loader {
    private _addres: string = 'https://dummyjson.com/products/category/smartphones';
    //private options: RequestInit = null;

    constructor() {

    }
    get addres() { return this._addres };

    async requestItems<T>() {
        const responce = await fetch(this.addres);

        if (!responce.ok) throw Error("bad request");

        const result: T = await responce.json();

        return result;
    }
}
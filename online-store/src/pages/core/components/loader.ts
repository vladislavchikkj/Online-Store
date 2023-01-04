class Loader {
    private _addres: string = 'https://dummyjson.com/products/' ;

    constructor() {

    }

    get addres() { return this._addres};

    async requestItems<T>() {
        const response = await fetch(this.addres);

        if(!response.ok) throw Error('err');

        const result: T = await response.json();
        console.log('result from loader', result);
        return result;
    }
}

export default Loader;
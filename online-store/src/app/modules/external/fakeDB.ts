import { IFilterCollection, item, product, productList } from '../../interfaces/interfaces';
import { Loader } from './loader';

export class fakeDB {
    private loader = new Loader();

    private DB: product[] = [];
    private selected: item[] = [];

    constructor() {
        this.enableSaveHandler();
    }

    async init() {
        this.DB = (await this.loader.requestItems<productList>()).products;

        const localStore = localStorage.getItem('items') as string;
        const idContainer: { id: number; count: number }[] = JSON.parse(localStore);

        if (!idContainer) return;

        idContainer.forEach((saved) => {
            const finded = this.DB.find((product) => product.id === saved.id);

            if (!finded) return;

            const item = {
                id: saved.id,
                count: saved.count,
                product: finded,
            };

            this.selected.push(item);
        });

        this.dispatchUpdate();
        localStorage.clear();
    }

    add(id: number) {
        if (this.find(id)) return;

        const addedPr = this.DB.find((product) => id === product.id);

        if (addedPr) {
            const addedIt = {
                id: id,
                product: addedPr,
                count: 1,
            };
            this.selected.push(addedIt);
        } else {
            console.log('there are no any item to this ID');
        }
        this.dispatchUpdate();
    }

    delete(id: number) {
        this.selected = this.selected.filter((item) => id !== item.id);

        this.dispatchUpdate();
    }

    updateCount(id: number, dif: number) {
        const updated = this.selected.find((item) => item.id === id);

        if (updated) {
            updated.count += dif;

            this.selected = this.selected.filter((item) => item.count > 0);
        } else {
            console.log('there are no any selected items to this ID');
        }

        this.dispatchUpdate();
    }

    getAll() {
        return this.DB;
    }
    getSelected() {
        return this.selected;
    }

    select(filters: IFilterCollection): product[] {
        let products = this.getAll();

        for (const critery in filters) {
            if (filters[critery] instanceof Set)
                products = products.filter((product) =>
                    (filters[critery] as Set<string>).has(`${product[critery]}`.toLowerCase())
                );
            else {
                const low = +(filters[critery] as number[])[0];
                const high = +(filters[critery] as number[])[1];
                products = products.filter((product) => low < +product[critery] && +product[critery] < high);
            }
            console.log(critery);
        }
        return products;
    }

    find(id: number): item | undefined {
        return this.selected.find((item) => id === item.id);
    }

    findFromAll(id: number) {
        return this.DB.find((product) => id === product.id);
    }

    dispatchUpdate() {
        document.dispatchEvent(
            new CustomEvent('update', {
                bubbles: true,
                detail: {
                    price: this.selected.reduce((acc, item) => acc + item.product.price * item.count, 0),
                    count: this.selected.reduce((acc, item) => acc + item.count, 0),
                },
            })
        );
    }

    enableSaveHandler() {
        window.addEventListener('unload', () => {
            const idArray = this.selected.map((item) => {
                return {
                    id: item.product.id,
                    count: item.count,
                };
            });
            localStorage.setItem('items', JSON.stringify(idArray));
        });
    }
}

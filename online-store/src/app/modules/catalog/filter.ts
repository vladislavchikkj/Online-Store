import { IFilterCollection, Iproduct } from '../../interfaces/interfaces';
import { product } from '../../interfaces/interfaces';

type critery = {
    label: string;
    type: string;
    variants?: Set<string>;
    range?: { from: number; to: number };
};

type criteryList = {
    [index: string]: critery;
};

type changeCritery = {
    name: string;
    type: string;
    value?: string;
    check?: boolean;
    range?: { from: number; to: number };
}

export class Filter {
    private categories: criteryList = {
        category: {
            label: 'Категории',
            type: 'categories',
            variants: new Set(),
        },
        brand: {
            label: 'Брэнды',
            type: 'categories',
            variants: new Set(),
        },
        price: {
            label: 'Цена',
            type: 'range',
            range: {
                from: 0,
                to: 3000,
            },
        },
    };

    private container: HTMLElement;
    private filters: IFilterCollection = {};

    constructor(place: HTMLElement) {
        place.insertAdjacentHTML('beforeend', this.generate());

        this.container = place.querySelector('.filter') as HTMLElement;

        this.enableHandler();
    }

    set filterConfig(input: product[]) {
        input.forEach((product) => {
            for (const name in this.categories) {
                if (this.categories[name].type !== 'categories') continue;

                this.categories[name].variants?.add(`${product[name]}`.toLowerCase());
            }
        });
        this.generateGroup();
    }

    generate(): string {
        return `<form class="filter" name = "filter"></form>`;
    }
    enableHandler(): void {
        this.container.addEventListener('filt_update', (e: CustomEventInit<critery>) => {
            this.filters = {};

            const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>('[type="checkbox"]'))
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => {
                    return {
                        name: checkbox.name,
                        value: checkbox.value,
                    };
                });

            checkboxes.forEach((checkbox) => {
                if (!this.filters[checkbox.name]) this.filters[checkbox.name] = new Set();
                (this.filters[checkbox.name] as Set<string>).add(checkbox.value);
            });

            Array.from(document.querySelectorAll<HTMLInputElement>('[type="range"].filter__up')).forEach((input) => {
                this.filters[input.name] = [];

                (this.filters[input.name] as number[])[0] = +input.value;
            });
            Array.from(document.querySelectorAll<HTMLInputElement>('[type="range"].filter__down')).forEach((input) => {
                (this.filters[input.name] as number[])[1] = +input.value;
            });

            this.container.dispatchEvent(
                new CustomEvent('request_filt', {
                    bubbles: true,
                    detail: this.filters,
                })
            );
        });
    }

    filtrate(products: product[]): product[] {
        for (const filter in this.filters) {
            if (this.filters[filter] instanceof Set)
                products = products.filter((product) => (this.filters[filter] as Set<string>).has(`${product[filter]}`.toLowerCase()));
            else {
                let low = (this.filters[filter] as number[])[0];
                let high = (this.filters[filter] as number[])[1];
                products = products.filter((product) => low < +product[filter] && +product[filter] < high);
            }
        }
        return products;
    }

    generateGroup() {
        for (const name in this.categories) {
            const type = this.categories[name].type === 'categories' ? 'filter__group' : 'filter__range';

            const template = `
                <div class="filter__block">
                    <h3 class="filter__title">${this.categories[name].label}</h3>
                    <div div class="${type}"> </div>
                </div>
            `;
            this.container.insertAdjacentHTML('beforeend', template);

            const container = (this.container.lastElementChild as HTMLElement).children[1];

            if (this.categories[name].type == 'categories') {
                this.categories[name].variants?.forEach((variant) => {
                    const variantFormtated = variant.replace(/^[^\s]{1}/, (value) => value.toUpperCase());

                    container.innerHTML += `
                        <div class="filter__item">
                            <label>
                                <input type="checkbox" name="${name}" value="${variant}">
                                ${variantFormtated}
                            </label>
                            
                        </div>
                    `;
                });
                container.addEventListener('click', (event) => {
                    const element = (event.target as HTMLElement).closest<HTMLInputElement>('input[type="checkbox"]');
                    if (!element) return;
                    const update: changeCritery = {
                        name: element.name,
                        type: 'variant',
                        value: element?.value,
                        check: false,
                    }
                    this.container.dispatchEvent(
                        new CustomEvent('filt_update', {
                            bubbles: true,
                            detail: update,
                        })
                    );
                });
            } else {
                container.innerHTML += `
                    <input type="range" name="price" class="filter__up" value = "0" min = "0" max = ${this.categories[name].range?.to} step= 10>
                    <input type="range" name="price" class="filter__down" value = ${this.categories[name].range?.to} min = "0" max = ${this.categories[name].range?.to} step= 10>
                    
                    <div class="filter__from-to">
                        <span class="price-start">1$</span>
                        <span class="price-end">3000$</span>
                    </div>`;

                const low = container.querySelector('.filter__up') as HTMLInputElement;
                const high = container.querySelector('.filter__down') as HTMLInputElement;

                const lowout = container.querySelector('.price-start') as HTMLElement;
                const hightout = container.querySelector('.price-end') as HTMLElement;

                low.addEventListener('input', () => {
                    const lowerVal = +low.value;
                    const upperVal = +high.value;

                    if (upperVal < lowerVal + 200) {
                        high.value = `${lowerVal + 200}`;

                        if (lowerVal == +low.min) {
                            high.value = '4';
                        }
                    }
                    lowout.textContent = `${low.value}$`;
                    hightout.textContent = `${high.value}$`;
                });
                low.addEventListener('change', () => {
                    this.container.dispatchEvent(
                        new CustomEvent('filt_update', { bubbles: true })
                    );
                });
                high.addEventListener('input', () => {
                    const lowerVal = +low.value;
                    const upperVal = +high.value;

                    if (lowerVal > upperVal - 200) {
                        low.value = `${upperVal - 200}`;

                        if (upperVal == +high.max) {
                            low.value = `${+high.max - 4}`;
                        }
                    }
                    lowout.textContent = `${low.value}$`;
                    hightout.textContent = `${high.value}$`;
                });
                high.addEventListener('change', () => {
                    this.container.dispatchEvent(
                        new CustomEvent('filt_update', { bubbles: true })
                    );
                });
            }
            //<p>(5/5)</p>
        }
    }
}

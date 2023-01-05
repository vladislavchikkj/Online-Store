import { IFilterCollection, Iproduct } from "../../interfaces/interfaces";
import { product } from "../../interfaces/interfaces";

type critery = {
    label: string,
    name: string,
    type: string,
    variants?: {
        label: string,
        name: string,
    }[],
    range?: { from: number, to: number },
}


export class Filter {
    private categories: critery[] = [
        {
            label: `Брэнды`,
            name: `brand`,
            type: `categories`,
            variants: [
                {
                    label: `Apple`,
                    name: `Apple`,
                },
                {
                    label: `Huawei`,
                    name: `Huawei`,
                },
                {
                    label: `Samsung`,
                    name: `Samsung`,
                },
                {
                    label: `OPPO`,
                    name: `OPPO`,
                },

            ]
        },
        {
            label: `Не Брэнды`,
            name: `not brand`,
            type: `categories`,
            variants: [
                {
                    label: `Apple`,
                    name: `Apple`,
                },
                {
                    label: `Huavei`,
                    name: `Huavei`,
                },
            ]
        },
    ];

    private container: HTMLElement;
    private filters: IFilterCollection = {};

    constructor(place: HTMLElement) {
        place.insertAdjacentHTML('beforeend', this.generate());

        this.container = place.querySelector('.filter') as HTMLElement;

        this.generateGroup();

        this.enableHandler();
    }
    generate(): string {
        return `<form class="filter" name = "filter"></form>`;
    }
    enableHandler(): void {
        this.container.addEventListener('click', (e) => {
            const element = (e.target as HTMLElement).closest<HTMLInputElement>('input[type="checkbox"]');

            if (element) {
                const input = Array.from(document.querySelectorAll<HTMLInputElement>('[type="checkbox"]'))
                    .filter((checkbox) => checkbox.checked)
                    .map((checkbox) => {
                        return {
                            name: checkbox.name,
                            value: checkbox.value,
                        }
                    });

                this.filters = {};

                input.forEach(checkbox => {
                    if (!this.filters[checkbox.name]) this.filters[checkbox.name] = [];
                    this.filters[checkbox.name].push(checkbox.value);
                });

                this.container.dispatchEvent(new CustomEvent('request_filt', {
                    bubbles: true,
                    detail: this.filters,
                }));

            }
        });
    }

    filtrate(products: product[]): product[] {
        for (let filter in this.filters) {
            products = products.filter((product) =>
                this.filters[filter].includes(`${product[filter]}`))
        }
        return products;
    }

    generateGroup() {
        this.categories.forEach((item, index) => {
            const type = (item.type === 'categories') ? `filter__group` : `filter__range`;

            this.container.innerHTML += `
                <div class="filter__block">
                    <h3 class="filter__title">${item.label}</h3>
                    <div div class="${type}"> </div>
                </div>
            `;
            const container = this.container.children[index].children[1];
            if (item.type === 'categories') {
                item.variants?.forEach((variant) => {
                    container.innerHTML += `
                        <div class="filter__item">
                            <label>
                                <input type="checkbox" name="${item.name}" value="${variant.name}">
                                ${variant.label}
                            </label>
                            <p>(5/5)</p>
                        </div>
                    `;
                });
            }
        });
    }
}
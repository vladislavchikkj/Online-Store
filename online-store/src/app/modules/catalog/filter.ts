type critery = {
    name: string,
    type: string,
    variants?: string[],
    range?: { from: number, to: number },
}


export class Filter {
    private categories: critery[] = [
        {
            name: `Производители`,
            type: `categories`,
            variants: [`lenovo`]
        },
        {
            name: `Производители`,
            type: `categories`,
            variants: [`lenovo`]
        },
    ];

    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML += this.generate();

        this.container = place.querySelector('.filter') as HTMLElement;

        this.generateGroup();
    }
    generate() {
        return `<aside class="filter"></aside>`;
    }
    enableHandler() {
        this.container.addEventListener('click', (e) => {
            const targer = e.target as HTMLElement;

            const category = (targer.closest('.filter__etem') as HTMLElement).dataset.category;
        });
    }

    generateGroup() {
        this.categories.forEach((item, index) => {
            const type = (item.type === 'categories') ? `filter__group` : `filter__range`;

            this.container.innerHTML += `
                <div class="filter__block">
                    <h3 class="filter__title">${item.name}</h3>
                    <div div class="${type}"> </div>
                </div>
            `;
            const container = this.container.children[index].children[1];
            if (item.type === 'categories') {
                item.variants?.forEach((variant) => {
                    container.innerHTML += `
                        <div class="filter__item">
                            <label>
                                <input type="checkbox" name="lenovo" id="proizvoditel">
                                ${variant}
                            </label>
                            <p>(5/5)</p>
                        </div>
                    `;
                });
            }
        });
    }
}
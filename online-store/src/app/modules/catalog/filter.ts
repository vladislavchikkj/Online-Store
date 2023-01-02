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
            label: `Производители`,
            name: `manufacturers`,
            type: `categories`,
            variants: [
                {
                    label: `Lenovo`,
                    name: `lenovo`,
                },
                {
                    label: `MSI`,
                    name: `msi`,
                },
            ]
        },
        {
            label: `Производители`,
            name: `manufacturers`,
            type: `categories`,
            variants: [
                {
                    label: `lenovo`,
                    name: `lenovo`,
                },
            ]
        },
    ];

    private container: HTMLElement;

    constructor(place: HTMLElement) {
        place.innerHTML += this.generate();

        this.container = place.querySelector('.filter') as HTMLElement;

        this.generateGroup();

        this.enableHandler();
    }
    generate() {
        return `<form class="filter" name = "filter"></form>`;
    }
    enableHandler() {
        this.container.addEventListener('click', (e) => {
            const targer = e.target as HTMLElement;

            const element = targer.closest('.filter__item input[type="checkbox"]') as HTMLInputElement;

            if (element) {
                const category = element.name;
                const value = element.value;
                const checked = element.checked;

                let inputs: HTMLInputElement[] = Array.from(this.container.querySelectorAll('input[type="checkbox"]'));
                inputs = inputs.filter((checkbox) => checkbox.checked);


                console.log(inputs.map((checkbox) => {
                    return {
                        'name': checkbox.name,
                        'value': checkbox.value,
                    }
                }));
            }
        });





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
export class Header {

    constructor(place: HTMLElement, lang: string = "ru") {
        place.insertAdjacentHTML('beforeend', this.render());
    }

    render() {
        return `
            <header class="header page__header">

                <a class="header__page-title" href="#start-page">Online store</a>
                <div class="total-bar">Cart total: 
                    <div class="total-num">0</div>
                </div>
                <a class="card card_active" href="#cart-page">
                    <div class="number-elemenst">0</div>
                </a>
                <a class="btn-catalog" href="#catalog-page">Catalog</a>

            </header>
        `;
    }
} ``
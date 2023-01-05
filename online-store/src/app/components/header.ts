export class Header {

    constructor(place: HTMLElement, lang: string = "ru") {
        place.innerHTML += this.render();
    }

    render() {
        return `
            <header class="header page__header">

                <a class="header__page-title" href="#main-page">Online store</a>
                <form class="header__search-form search-form">
                    <input class="search-form__input" placeholder="Выберите товар">
                </form>
                <a class="card card_active" href="#basket-page"></a>
                <a class="btn-catalog" href="#catalog-page">Catalog</a>

            </header>
        `;
    }
}
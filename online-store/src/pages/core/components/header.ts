import Component from "../templates/components";
import { PageIds } from '../../core/wrapCurrentPage';
const Buttons = [
    {
        id: PageIds.MainPage,
        text: 'Online store',
    },
    {
        id: PageIds.BasketPage,
        text: 'Basket-page',
    },
    {
        id: PageIds.CatalogPage,
        text: 'Catalog',
    },
];
console.log(Buttons[0].text);
class Header extends Component {

    

    constructor(tagName: string, classNmae: string) {
        super(tagName, classNmae);
    }

    renderHeaderElement() {
        const pageButtons = document.createElement('div');
        pageButtons.className = 'container header__container';
        
            const buttonMain = document.createElement('a');
            buttonMain.className = 'header__page-title'
            buttonMain.href = `#${Buttons[0].id}`;
            buttonMain.innerText = Buttons[0].text;

            const formHeader = document.createElement('form');
            formHeader.className = 'header__search-form search-form';
            const inputHeader = document.createElement('input');
            inputHeader.className = 'search-form__input';
            inputHeader.placeholder = 'Выберите товар';
            formHeader.append(inputHeader);

            const buttonBasket = document.createElement('a');
            buttonBasket.className = 'card card_active'
            buttonBasket.href = `#${Buttons[1].id}`;

            const button2Basket = document.createElement('a');
            button2Basket.className = 'btn-catalog'
            button2Basket.innerText = Buttons[2].text;
            button2Basket.href = `#${Buttons[2].id}`;

            pageButtons.append(buttonMain);
            pageButtons.append(formHeader);
            pageButtons.append(buttonBasket);
            pageButtons.append(button2Basket);
        this.container.append(pageButtons)
    }

    render() {
        this.renderHeaderElement()
        return this.container;
    }
}

export default Header;
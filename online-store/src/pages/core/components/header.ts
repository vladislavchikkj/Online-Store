import Component from "../templates/components";
import { PageIds } from '../../core/wrapCurrentPage';
import Page from "../templates/page";
const Buttons = [
    {
        id: PageIds.MainPage,
        text: 'Online store',
    },
    {
        id: PageIds.BasketPage,
        text: 'Basket-page',
    },
];
console.log(Buttons[0].text);
class Header extends Component {

    

    constructor(tagName: string, classNmae: string) {
        super(tagName, classNmae);
    }

    renderPageButtons() {
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

            pageButtons.append(buttonMain);
            pageButtons.append(formHeader);
            pageButtons.append(buttonBasket);
        this.container.append(pageButtons)
    }

    render() {
        this.renderPageButtons()
        return this.container;
    }
}

export default Header;
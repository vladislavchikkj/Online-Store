import Page from '../core/templates/page'
import MainPage from "../main-page";
import BasketPage from "../basket-page";
import Header from '../core/components/header';

export const enum PageIds {
    MainPage = 'main-page',
    BasketPage = 'basket-page',
}

class App {
    private static container: HTMLElement = document.body; // Потомучто в статике недоступен this
    private static defaultPageId: string = 'current-page';
    private initialPage: MainPage;
    private header: Header;

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if(currentPageHTML){
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if(idPage === PageIds.MainPage){
            page = new MainPage(idPage)
        } else if (idPage === PageIds.BasketPage) {
            page = new BasketPage(idPage);
        }

        if(page){
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML)
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash)
        })
    }

    constructor() {
        this.initialPage = new MainPage('main-page');
        this.header = new Header('header', 'header-container');
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('basket-page');
        this.enableRouteChange();
    }
}

export default App;
import Page from './templates/page';
import MainPage from "../main-page";
import BasketPage from "../basket-page";
import CatalogPage from '../catalog-page';
import ErrorPage from '../error-page';
import Item from './components/item';
// import Product from './components/item';

export const enum PageIds {
    MainPage = 'main-page',
    BasketPage = 'basket-page',
    CatalogPage = 'catalog-page'
}

class WrapComp {
    protected static container: HTMLElement;
    private initialPage: MainPage;

    private static defaultPageId: string = 'currentPage';
    private hash: string = 'main-page';

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${WrapComp.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.MainPage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.BasketPage) {
            page = new BasketPage(idPage);
        }
        else if (idPage === PageIds.CatalogPage) {
            page = new CatalogPage(idPage)
        }
        else {
            page = new ErrorPage(idPage, '404')
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = WrapComp.defaultPageId;
            WrapComp.container.append(pageHTML)
            return page;
        }
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            this.getPrivateHash();
            WrapComp.renderNewPage(this.hash);

        })
    }
    private getPrivateHash() {
        this.hash = window.location.hash.slice(1);
    }

    constructor() {
        WrapComp.container = document.createElement('main')
        WrapComp.container.className = 'wrapperCurrentPage';
        this.initialPage = new MainPage('main-page');

    }



    renderWrapApp() {

        this.getPrivateHash();
        this.enableRouteChange();
        WrapComp.renderNewPage(this.hash);
        return WrapComp.container;
    }

}

export default WrapComp;
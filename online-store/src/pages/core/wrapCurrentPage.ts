import Page from './templates/page';
import MainPage from "../main-page";
import BasketPage from "../basket-page";
import CatalogPage from '../catalog-page';
import ErrorPage from '../error-page';
import Product from './components/prod';

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
        if(currentPageHTML){
            currentPageHTML.remove();
        }
        let page: Page | null = null;
        
        if(idPage === PageIds.MainPage){
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

        if(page){
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
        const widgetUsers = new Product('products');
        widgetUsers.fetchData();
        setTimeout(() => {
            console.log(widgetUsers.getData());
        }, 1000);
    }



    renderWrapApp() {
        this.getPrivateHash();
        this.enableRouteChange();
        console.log('Этот' , this.hash);
        WrapComp.renderNewPage(this.hash);
        return WrapComp.container;
    }

}

export default WrapComp;
import Page from '../core/templates/page'
import MainPage from "../main-page";
import BasketPage from "../basket-page";
import Header from '../core/components/header';
import Footer from '../core/components/foter';

export const enum PageIds {
    MainPage = 'main-page',
    BasketPage = 'basket-page',
}

class WrapApp {
    protected static container: HTMLElement;
    static TextObgect = {};
    private initialPage: MainPage;
    private header: Header;
    private footer: Footer;

    private static defaultPageId: string = 'currentPage';

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${WrapApp.defaultPageId}`);
        if(currentPageHTML){
            console.log(currentPageHTML);
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
            pageHTML.id = WrapApp.defaultPageId;
            WrapApp.container.append(pageHTML)
            return page;
        }


        
    }

    private enableRouteChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            WrapApp.renderNewPage(hash)
        })
    }

    constructor() {
        WrapApp.container = document.createElement('div')
        WrapApp.container.className = 'container';
        this.header = new Header('header', 'header-cc');
        this.initialPage = new MainPage('main-page');
        this.footer = new Footer('footer', 'Footer-cc');
    }

    // protected createWrapApp(text: string, className: string) {
    //     const page = document.createElement('div');
    //     page.className = className;
    //     page.innerHTML = text;
    //     console.log(page);
    //     return page;
    // }

    renderWrapApp() {
        WrapApp.container.append(this.header.render());
        WrapApp.renderNewPage('main-page');
        WrapApp.container.append(this.footer.render());
        this.enableRouteChange();
        return WrapApp.container;
    }

}

export default WrapApp;
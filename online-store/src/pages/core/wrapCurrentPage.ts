// import Page from './templates/page';
// import MainPage from "../main-page";
// import BasketPage from "../basket-page";

// export const enum PageIds {
//     MainPage = 'main-page',
//     BasketPage = 'basket-page',
// }

// class WrapComp {
//     protected static container: HTMLElement;
//     static TextObgect = {};
//     private initialPage: MainPage;

//     private static defaultPageId: string = 'currentPage';

//     static renderNewPage(idPage: string) {
//         const currentPageHTML = document.querySelector(`#${WrapComp.defaultPageId}`);
//         if(currentPageHTML){
//             console.log(currentPageHTML);
//             currentPageHTML.remove();
//         }
//         let page: Page | null = null;
        
//         if(idPage === PageIds.MainPage){
//             page = new MainPage(idPage)
//         } else if (idPage === PageIds.BasketPage) {
//             page = new BasketPage(idPage);
//         }

//         if(page){
//             const pageHTML = page.render();
//             pageHTML.id = WrapComp.defaultPageId;
//             WrapComp.container.append(pageHTML)
//             return page;
//         }


        
//     }

//     private enableRouteChange() {
//         window.addEventListener('hashchange', () => {
//             const hash = window.location.hash.slice(1);
//             WrapComp.renderNewPage(hash)
//         })
//     }

//     constructor() {
//         WrapComp.container = document.createElement('div')
//         WrapComp.container.className = 'wrapperCurrentPage';
//         this.initialPage = new MainPage('main-page');
//     }

//     // protected createWrapApp(text: string, className: string) {
//     //     const page = document.createElement('div');
//     //     page.className = className;
//     //     page.innerHTML = text;
//     //     console.log(page);
//     //     return page;
//     // }

//     renderWrapApp() {
//         WrapComp.renderNewPage('main-page');
//         this.enableRouteChange();
//         return WrapComp.container;
//     }

// }

// export default WrapComp;
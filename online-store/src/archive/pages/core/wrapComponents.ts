import Header from '../core/components/header';
import Footer from '../core/components/foter';
import WrapComp from './wrapCurrentPage';


class WrapApp {
    protected static container: HTMLElement;
    static TextObgect = {};
    private header: Header;
    private wrapComp: WrapComp;
    private footer: Footer;


    constructor() {
        WrapApp.container = document.createElement('div')
        WrapApp.container.className = 'container';
        this.header = new Header('header', 'header page__header');
        this.wrapComp = new WrapComp();
        this.footer = new Footer('footer', 'Footer-cc');
    }

    renderWrapApp() {
        WrapApp.container.append(this.header.render());
        WrapApp.container.append(this.wrapComp.renderWrapApp());
        WrapApp.container.append(this.footer.render());
        return WrapApp.container;
    }

}

export default WrapApp;
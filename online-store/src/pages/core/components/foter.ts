import Component from "../templates/components";


class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderFooter() {
        const pageFooter = document.createElement('div');
        pageFooter.innerText = 'Online Store 2023'
        pageFooter.className = 'footer__container'
        this.container.append(pageFooter)
    }

    render() {
        this.renderFooter()
        return this.container;
    }
}

export default Footer;
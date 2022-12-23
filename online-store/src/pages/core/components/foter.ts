import Component from "../templates/components";


class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageButtons() {
        const pageButtons = document.createElement('div');
        pageButtons.innerText = 'Online Store 2023'
        this.container.append(pageButtons)
    }

    render() {
        this.renderPageButtons()
        return this.container;
    }
}

export default Footer;
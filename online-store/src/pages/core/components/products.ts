import Component from "../templates/components";


class Products extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderProductElem() {
        const productContainer = document.createElement('div');
        productContainer.className = 'products'
        productContainer.innerText = ''
        this.container.append(productContainer)
    }

    render() {
        this.renderProductElem()
        return this.container;
    }
}

export default Products;
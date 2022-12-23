import  Page from '../core/templates/page';
import Products from '../core/components/products';

class CatalogPage extends Page {

    private products: Products;


    constructor(id: string) {
        super(id);
        this.products = new Products('products');
    }
    
    render() {
        const title = this.createPage('');
        title.append(this.products.render())
        this.container.append(title);
        return this.container;
    }
}

export default CatalogPage;
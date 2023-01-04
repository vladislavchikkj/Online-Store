
class Products {

    protected container: HTMLElement;


    constructor(id: string) {
        this.container = document.createElement('div')
        this.container.id = id; 
    }

    


    renderProductElem() {

        const productContainer = this.container;
        productContainer.className = 'products'
        productContainer.innerHTML = `
        <div class="products__sort">
            <div class="sort-bar">Sort options</div>
            <div class="stat">Found: 100</div>
            <div class="total-bar">Cart total</div>
            <div class="view-mode">
                <div class="big-v active-mode"></div>
                <div class="small-v"></div>
            </div>
        </div>
        <div class="products__items">
            <div class="item-card">
            <div class="item-text">
                <div class="item-title">Name product</div>
                <div class="item-info">Info Product</div>
            </div>
            <div class="item-buttons">
                <div class="item-buttons__btn">Add To Cart</div>
                <div class="item-buttons__btn">Details</div>
            </div>
            </div>
        </div>
        `
        
    }

    render() {
        this.renderProductElem()
        return this.container;
    }
}

export default Products;
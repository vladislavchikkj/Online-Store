import  Page from '../core/templates/page';

class BasketPage extends Page {
    static TextObgect = {
        MainTitle: 'Basket Page',

    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createHeaderTitle(BasketPage.TextObgect.MainTitle)
        this.container.append(title);
        return this.container;
    }
}

export default BasketPage;
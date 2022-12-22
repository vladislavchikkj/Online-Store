import  Page from '../core/templates/page';

class CatalogPage extends Page {
    static TextObgect = {
        MainTitle: 'Catalog Page',

    };

    constructor(id: string) {
        super(id);
    }

    render() {
        const title = this.createPage(CatalogPage.TextObgect.MainTitle)
        this.container.append(title);
        return this.container;
    }
}

export default CatalogPage;
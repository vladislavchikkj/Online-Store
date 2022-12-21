abstract class Page {
    protected container: HTMLElement;
    static TextObgect = {};
    

    constructor(id: string) {
        this.container = document.createElement('div')
        this.container.id = id;
    }

    protected createPage(text: string) {
        const page = document.createElement('div');
        page.className += "main-page";
        page.innerHTML = text;
        return page;
    }

    render() {
        return this.container;
        
    }

}

export default Page;
import  Page from '../core/templates/page'


class MainPage extends Page{
    static TextObgect = {
        MainTitle: `<div class="container">
        <div class="main-page">
          <div class="main-page__box">
            Online-store
            <div class="btn">В каталог</div>
          </div>
          <div class="catalog">
            <div class="catalog__item">
              <img src="http://cdn.onlinewebfonts.com/svg/img_62296.png" alt="item-logo">
              <div class="wrapper-text">
                <div class="name-item">Name Item</div>
                <div class="decsr">descr</div>
              </div>
            </div>
            <div class="catalog__item">
              <img src="http://cdn.onlinewebfonts.com/svg/img_62296.png" alt="item-logo">
              <div class="wrapper-text">
                <div class="name-item">Name Item</div>
                <div class="decsr">descr</div>
              </div>
            </div>
            <div class="catalog__item">
              <img src="http://cdn.onlinewebfonts.com/svg/img_62296.png" alt="item-logo">
              <div class="wrapper-text">
                <div class="name-item">Name Item</div>
                <div class="decsr">descr</div>
              </div>
            </div>
            <div class="catalog__item">
              <img src="http://cdn.onlinewebfonts.com/svg/img_62296.png" alt="item-logo">
              <div class="wrapper-text">
                <div class="name-item">Name Item</div>
                <div class="decsr">descr</div>
              </div>
            </div>
            
          </div>
        </div>
          
      </div>`,
    };

    constructor(id: string) {
        super(id);
    }



    render() {
        const title = this.createHeaderTitle(MainPage.TextObgect.MainTitle);
        this.container.append(title);
        return this.container;
    }
}

export default MainPage;
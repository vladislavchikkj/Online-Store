export class Footer {
    constructor(place: HTMLElement) {
        place.insertAdjacentHTML('beforeend', this.render());
    }

    render() {
        return `
            <footer class="footer">
                <a href='https://github.com/vladislavchikkj' class="footer-link-git">vladislavchikkj</a>
                <div class="descr">RS-School - Online Store - 2023</div>
                <a href='https://github.com/ivan52945' class="footer-link-git">ivan52945</a>
            </footer>
        `;
    }
}

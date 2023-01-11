// import Page from '../core/templates/page';

// class ErrorPage extends Page {
//     private errorType: string;

//     static TextObject: { [prop: string]: string } = {
//         '404': 'Error! The page was not found.'
//     };

//     constructor(id: string, errorType: string) {
//         super(id);
//         this.errorType = errorType;
//     }

//     render() {
//         const title = this.createHeaderTitle(ErrorPage.TextObgect[this.errorType]);
//         this.container.append(title);
//         return this.container;
//     }
// }

// export default ErrorPage;
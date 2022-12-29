export interface IComponent {
    render(callback?: () => void): string;
}

export interface IPageList {
    [index: string]: IMain;
}

export interface IMain {

}
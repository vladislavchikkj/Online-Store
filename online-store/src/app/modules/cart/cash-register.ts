import { IMain, product, item } from '../../interfaces/interfaces';

import { Cart } from "./cart";
import { Reckoning } from './reckoning';





export class СashRegister implements IMain {
    private list = [
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 1,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 3,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 5,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 7,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 9,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 11,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 13,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
        {
            product: {
                brand: "Apple",
                category: "smartphones",
                decription: "An apple mobile which is nothing like apple",
                discountPercentage: 12.96,
                id: 15,
                images: ['https://i.dummyjson.com/data/products/1/1.jpg', 'https://i.dummyjson.com/data/products/1/2.jpg', 'https://i.dummyjson.com/data/products/1/3.jpg', 'https://i.dummyjson.com/data/products/1/4.jpg', 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'],
                price: 549,
                rating: 4.69,
                stock: 94,
                thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
                title: "iPhone 9",
            },
            count: 1,
        },
    ];;

    private container: HTMLElement;

    private cart: Cart;
    private reckoning: Reckoning;

    constructor(place: HTMLElement, cart: item[]) {
        place.innerHTML = this.render();

        this.container = place.querySelector(".basket-page") as HTMLElement;

        this.cart = new Cart(this.container);
        this.cart.input = cart;

        //console.log(cart)

        this.reckoning = new Reckoning(this.container);

        this.reckoning.input = this.cart.output;


        this.container.addEventListener('update', () => {
            this.reckoning.input = this.cart.output;
        });
    }

    inputActive(items: item[]) {
        this.reckoning.input = this.cart.input = items;
    }

    render(): string {
        return `<div class="basket-page"></div>`;
    }

}

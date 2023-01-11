import { IMain, product, item } from '../../interfaces/interfaces';
import { validateFuncs } from '../../../archive/pages/utils/validator';

type promo = {
    promo: string,
    bonus: number;
}

export class Reckoning {
    private products: item[] = [];

    private addPromoList = [
        {
            promo: 'ABC',
            bonus: 0.15
        },
        {
            promo: 'RS',
            bonus: 0.1
        },
        {
            promo: 'GOOD BOY',
            bonus: 0.3
        },
    ];

    private totalPriceOutput: HTMLElement;
    private promoInput: HTMLInputElement;
    private status: HTMLElement;
    private promoButton: HTMLButtonElement;

    private promoContainer: HTMLElement;

    private FinalPriceOutput: HTMLElement;

    private activePromo: Set<promo> = new Set();

    private container: HTMLElement;

    private mainContainer: HTMLElement | null;

    constructor(place: HTMLElement) {
        place.insertAdjacentHTML("beforeend", this.render());

        this.container = place.querySelector(".basket-page") as HTMLElement;

        this.totalPriceOutput = place.querySelector(".reckoning__total-price") as HTMLElement;
        this.promoInput = place.querySelector(".reckoning__promo-input") as HTMLInputElement;
        this.promoButton = place.querySelector(".reckoning__promo-button") as HTMLButtonElement;


        this.status = place.querySelector(".reckoning__status") as HTMLElement;

        this.promoContainer = place.querySelector(".reckoning__promo-container") as HTMLElement;

        this.FinalPriceOutput = place.querySelector(".reckoning__summary") as HTMLElement;

        this.promoInput.addEventListener('input', () => {
            this.promoInput.value = this.promoInput.value.slice(0, 8);
        });

        this.updatePrice();

        this.promoButton.addEventListener('click', () => {
            const promoInput = this.promoInput.value.toUpperCase();

            const index = this.addPromoList.find((value) => value.promo === promoInput);

            if (index) {
                this.activePromo.add(index);
                this.setPromoList();

                this.updatePrice();
            }
            else {
                this.status.hidden = false;
                setTimeout(() => {
                    this.status.hidden = true;
                }, 200)
            }
        })

        this.mainContainer = document.querySelector('.container');
        this.mainContainer?.insertAdjacentHTML("beforeend", this.renderModal())

        this.addChangeModalListeners()
        this.addValidationListeners()
    }

    updatePrice() {
        const count = this.products.reduce((acc, product) => acc + product.product.price * product.count, 0);

        const discount = Array.from(this.activePromo).reduce((acc, promo) => acc + promo.bonus, 0);

        this.totalPriceOutput.innerText = `On cash register: ${count}$`;
        this.FinalPriceOutput.innerText = `Summary: ${Math.ceil(count * (1 - discount))}$`;

    }

    set input(list: item[]) {
        this.products = list;

        this.updatePrice();
    }


    setPromoList() {
        this.promoContainer.innerHTML = Array.from(this.activePromo).sort()
            .reduce((acc, promo) =>
                acc + `<p class="reckoning__promo-item">${promo.promo}: ${promo.bonus * 100}%</p>`
                , "");
    }


    render(): string {
        return `
            <section class="basket-page__reckoning reckoning">
                <p class="reckoning__total-price">On cash register: 300$</p>
                <p class="reckoning__rules">Input promo-code for discounting</p>
                <label class="reckoning__promo-label">Promo-code: <input type="text" class="reckoning__promo-input"></label>
                <button class="reckoning__promo-button">Active promo</button>
                <p class="reckoning__status" hidden>Wrong promo code</p>
                <div class="reckoning__promo-container"></div>
                <p class="reckoning__summary">Summary: 300$ + fisting</p>
                <button class="reckoning__buy-button">Buy all</button>
            </section>
            `;
    }
    renderModal(): string {
        return `
        <div class="modal">
        <form class="form">
            <h2 class="form__title">Personal info</h2>
            <ul class="personal-detail form__personal-detail">
            <li class="personal-detail__item">
                <input 
                class="personal-detail__input" 
                type="text" 
                placeholder="First Name & Last Name" 
                pattern="^([A-Za-zА-Яа-яЁё]{3,}\\s?){2,}" 
                title='Format: Minimum two words. Minimal length of each = 3' 
                data-cartModal-inputField="name"
                required>
            </li>
            <li class="personal-detail__item">
                <input
                class="personal-detail__input" 
                type="text" 
                placeholder="Address"
                pattern="^([A-Za-zА-Яа-яЁё]{5,}\\s?){3,}" 
                title='Format: Minimum three words. Minimal length of each = 5' 
                data-cartModal-inputField="address"
                required>
            </li>
            <li class="personal-detail__item">
                <input 
                class="personal-detail__input" 
                type="tel" 
                placeholder="Phone number" 
                pattern="\\+[0-9]{9,15}" 
                title='Format: +15551110000. Minimal length = 9' 
                data-cartModal-inputField="phone"
                required>
            </li>
            <li class="personal-detail__item">
                <input 
                class="personal-detail__input" 
                type="email" 
                placeholder="E-mail"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" 
                title="example@mail.com"
                data-cartModal-inputField="email"
                required>
            </li>
            </ul>

            <h2 class="form__title">Credit card</h2>
            <ul class="card-detail form__card-detail">
            <li class="card-detail__item">  
                <input 
                class="card-detail__input" 
                type="tel" 
                pattern="[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}" 
                title='Format: Only number. Length = 16.' 
                placeholder="Card number" 
                maxlength="19" 
                data-cartModal-inputField="cardNumber"
                required>
            </li>
            <li class="card-detail__item">
                <label class="card-detail__label">VALID
                <input 
                    class="card-detail__input" 
                    type="text" 
                    pattern="[0-9]{2}/[0-9]{2}" 
                    title="Format: MM/YY, month: 1-12, year: 22-39" 
                    placeholder="00/00" 
                    maxlength="5"
                    data-cartModal-inputField="cardDate"
                    required>
                </label>
            </li>
            <li class="card-detail__item">
                <label class="card-detail__label">CVV
                <input 
                    class="card-detail__input" 
                    type="number" pattern="[0-9]{3}" 
                    title="Format: 000" 
                    placeholder="000" 
                    maxlength="3" 
                    data-cartModal-inputField="cardCvv"
                    required>
                </label>
            </li>
            </ul>
            <input class="form__submit-btn" type="submit" value="CONFIRM">
        </form>
        </div>
            `;
    }

    addChangeModalListeners() {
        const modal = document.querySelector('.modal') as HTMLElement;
        const orderBtn = document.querySelector('.reckoning__buy-button') as HTMLElement;

        if (orderBtn) {
            orderBtn.addEventListener('click', () => {
                console.log('hi');
                this.showCartModal();
            })
        }
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                console.log('click');
                this.hideCartModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Escape') {
                this.hideCartModal();
            }
        });
    }

    showCartModal() {
        const modal = document.querySelector('.modal') as HTMLElement;
        modal.style.opacity = '1';
        modal.style.zIndex = '1';
    }

    hideCartModal() {
        const modal = document.querySelector('.modal') as HTMLElement;
        modal.style.opacity = '0';
        modal.style.zIndex = '-1';
    }
    addValidationListeners() {
        const confirmBtn = document.querySelector('.form__submit-btn') as HTMLElement;
        const modalInputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('[data-cartmodal-inputfield]');
        const cardNumberInput: HTMLInputElement | null = document.querySelector('[data-cartmodal-inputfield="cardNumber"]');
        const cardCvvInput: HTMLInputElement | null = document.querySelector('[data-cartmodal-inputfield="cardCvv"]');
        const cardDateInput: HTMLInputElement | null = document.querySelector('[data-cartmodal-inputfield="cardDate"]');
        const telInput: HTMLInputElement | null = document.querySelector('[data-cartmodal-inputfield="phone"]');

        if (cardNumberInput) {
            this.addMaxLengthControlListener(cardNumberInput);
        }
        if (cardCvvInput) {
            this.addMaxLengthControlListener(cardCvvInput);
        }

        telInput?.addEventListener('keydown', (event) => {
            if (event.target instanceof HTMLInputElement) {
                if (event.key !== '+' && event.key !== 'Backspace' && isNaN(Number(event.key))) {
                    event.preventDefault();
                }
            }
        });

        cardNumberInput?.addEventListener('keydown', (event) => {
            if (event.target instanceof HTMLInputElement) {
                if (event.key !== 'Backspace' && isNaN(Number(event.key))) {
                    event.preventDefault();
                }
                const value = cardNumberInput.value.split(' ').join('');
                const valueAfter = value.match(/.{1,4}/g);
                if (valueAfter) cardNumberInput.value = valueAfter.join(' ');
            }
        });
        cardDateInput?.addEventListener('keydown', (event) => {
            if (event.target instanceof HTMLInputElement) {
                if (event.key !== 'Backspace' && isNaN(Number(event.key))) {
                    event.preventDefault();
                }
                if (event.key !== 'Backspace' && event.target.value.length === 2) {
                    event.target.value += '/';
                }
            }
        });

        const performInputValidation = (input: HTMLInputElement) => {
            const parent = input.parentElement;
            const field = input.dataset.cartmodalInputfield;
            const value = input.value;

            if (field !== undefined && field in validateFuncs && validateFuncs[field](value)) {
                return true;
            } else {
                parent?.classList.add('personal-detail__input--error');
                return false;
            }
        };

        modalInputs.forEach((input) => {
            const parent = input.parentElement;
            input.oninput = () => {
                parent?.classList.remove('personal-detail__input--error');
                input.onblur = () => {
                    performInputValidation(input);
                };
            };
        });

        confirmBtn.onclick = (e) => {
            let isFormValid = true;
            e.preventDefault();
            modalInputs.forEach((input) => {
                input.classList.remove('personal-detail__input--error');
                isFormValid = performInputValidation(input) && isFormValid;
            });
            if (isFormValid) {
                this.onSuccessOrder();
            }
        };
    }

    addMaxLengthControlListener(input: HTMLInputElement) {
        input?.addEventListener('input', (event) => {
            if (event.target instanceof HTMLInputElement) {
                const target: HTMLInputElement = event.target;
                if (target.value.length > target.maxLength) target.value = target.value.slice(0, target.maxLength);
            }
        });
    }

    onSuccessOrder() {
        const form = document.querySelector('.form');
        if (form) {
            form.innerHTML = `
      <h2 class="form__title form__title--success">Thank you!
      Your order has been placed.
      Your purchase is successful.</h2>`;
            localStorage.clear();
        }
        setTimeout(() => {
            window.location.href = './';
        }, 3000);
    }

}
/*
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
                    <p class="reckoning__promo-item">LSFHG: 15%</p>
*/
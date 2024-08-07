import { cart, loadFromStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/ordersummary.js";

describe('test suite: renderOrderSummary', () => {
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = `<div class="js-order-summary"></div>`;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryTimeId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 2,
                    deliveryTimeId: '2'
                }
            ]);
        });

        console.log(cart);

        loadFromStorage();
        
        renderOrderSummary();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    });

    it('removes a product', () => {
        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

        

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryTimeId: '1'
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 2,
                    deliveryTimeId: '2'
                }
            ]);
        });

        console.log(cart);

        loadFromStorage();
        
        renderOrderSummary();

        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();

    });
});
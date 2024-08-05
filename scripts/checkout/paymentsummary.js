import {cart, getTotalCartItems} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary() {
    const shippingCharge = 499;

    let productPrice = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPrice += product.priceCents * cartItem.quantity;
    }); 

    const totalBeforeTax = productPrice + shippingCharge;
    
    let paymentHTML = '';

    const paymentSummary = document.querySelector('.js-payment-summary');

    paymentHTML += 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${getTotalCartItems()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;


    paymentSummary.innerHTML = paymentHTML;

    console.log(productPrice);
}
import {cart, getTotalCartItems} from '../../data/cart.js';
import { getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { getDeliveryTime } from '../../data/deliveryTime.js';

export function renderPaymentSummary() {
    let productPrice = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPrice += product.priceCents * cartItem.quantity;

        const deliveryTime = getDeliveryTime(cartItem.deliveryTimeId);
        shippingPriceCents += deliveryTime.priceCents;
    }); 

    const totalBeforeTax = productPrice + shippingPriceCents;
    const taxCharge = productPrice * 0.1;
    const orderTotal = totalBeforeTax + taxCharge;
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
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCharge)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;


    paymentSummary.innerHTML = paymentHTML;

}
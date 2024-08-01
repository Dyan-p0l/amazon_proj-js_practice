import {cart, removeToCart} from '../data/cart.js';
import { products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { dateFormat } from './utils/date.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryTime} from '../data/deliveryTime.js';

let cartHTML = '';
const orderSum = document.querySelector('.order-summary');

const currDate = dayjs();

cart.forEach((cartItem) => {

    let productId =  cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) matchingProduct = product;
        
    });

    const deliveryTimeId = cartItem.deliveryTimeId;

    let matchingDeliveryTimeId;

    deliveryTime.forEach( (delivery) => {
      if (delivery.id === deliveryTimeId) matchingDeliveryTimeId = delivery;

    });

    const deliveryDate = currDate.add(matchingDeliveryTimeId.deliveryDays, 'day');
    const dateString = dateFormat(deliveryDate);

    cartHTML += 
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}" >
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>  
                <div class="product-price">
                  ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `
});

orderSum.innerHTML = cartHTML;

const deleteAll = document.querySelectorAll('.delete-quantity-link');



function deliveryOptionHTML (matchingProduct, cartItem) {

  let deliveryHTML = '';

  deliveryTime.forEach( (deliveryOption) => {
    const deliveryDate = currDate.add(deliveryOption.deliveryDays, 'day');
    const dateString = dateFormat(deliveryDate);
    const deliveryPrice = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`; 
    const isChecked = deliveryOption.id === cartItem.deliveryTimeId;
    deliveryHTML += `
        <div class="delivery-option">
          <input type="radio" ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${deliveryPrice}
            </div>
          </div>
        </div>
    `;
  });
  return deliveryHTML;
}

deleteAll.forEach((link) => {
  link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeToCart(productId);
      const cartItem = document.querySelector(`.js-cart-item-container-${productId}`);
      cartItem.remove();
  });
});
export const cart = {
    cartItems: undefined,
    loadFromStorage:  () => {
        this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
        if (!this.cartItems) {
            this.cartItems = [
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
            ];
        }
    },
    saveToLocal: () => {localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));},
    addToCart: (productId) => {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) matchingItem = cartItem;
        });
      
        if (matchingItem) {
            matchingItem.quantity += 1;
        }else{
            this.cartItems.push({
                productId: productId,
                quantity: 1
            });
        }
        this.saveToLocal();
    },
    removeToCart: (productId) => {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
        this.cartItems = newCart;
        });
    
        this.saveToLocal();
    },
    updateDeliveryTimeId: (productId, deliveryTimeId) => {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryTimeId = deliveryTimeId;
    
        this.saveToLocal();
    },
    getTotalCartItems: () => {
        let totalItems = 0;
        this.cartItems.forEach((cartItem) => {
            totalItems += cartItem.quantity;
        });
        return totalItems;
    }
 
};

loadFromStorage();
export const deliveryTime = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0 
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499 
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryTime (deliveryTimeId) {
    let matchingDelivery;

    deliveryTime.forEach( (delivery) => {
    if (delivery.id === deliveryTimeId) {
        matchingDelivery = delivery;
    }
    });

    return matchingDelivery || deliveryTime[0];
}
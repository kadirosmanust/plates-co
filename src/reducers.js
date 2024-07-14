import { PRODUCTS } from './constants';
import { EVENTS } from './constants/pubSubEvents';
import { publish } from './pubsub';
import { getState, setState } from './store';
import { calculateDeliveryCharge } from './logic/delivery';
import { RED_PLATE_CAMPAIGN } from './logic/campaigns';
import { floorAndFix } from './utils/math';

export const calculateTotal = () => {
  const state = getState();

  let totalCost = RED_PLATE_CAMPAIGN.checkAndCalculateTotal({
    products: state.basket,
  });

  const deliveryCharge = calculateDeliveryCharge(totalCost);
  totalCost += deliveryCharge;
  const flooredTotal = floorAndFix(totalCost);

  setState('total', flooredTotal);
};

export const addProduct = productCode => {
  if (!PRODUCTS[productCode]) return;
  const state = getState();
  const newBasket = [...state.basket];
  newBasket.push(productCode);
  setState('basket', newBasket);
  calculateTotal();
  publish(EVENTS.BASKET_UPDATED, state);
};

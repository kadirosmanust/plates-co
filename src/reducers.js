import { PRODUCTS } from './constants';
import { EVENTS } from './constants/pubSubEvents';
import { publish } from './pubsub';
import { getState, setState } from './store';
import { calculateDeliveryCharge } from './logic/delivery';
import { RED_PLATE_CAMPAIGN } from './logic/campaigns';
import { floorAndFix } from './utils/math';

export const addActiveCampaign = campaign => {
  const state = getState();
  const newCampaigns = [...state.activeCampaigns];
  newCampaigns.push(campaign);
  setState('activeCampaigns', newCampaigns);
  publish(EVENTS.CAMPAIGN_APPLIED, campaign);
};

export const calculateTotal = () => {
  const state = getState();

  const { totalCost, isApplied } = RED_PLATE_CAMPAIGN.checkAndCalculateTotal({
    products: state.basket,
  });

  if (totalCost === 0) {
    setState('total', 0);

    return;
  }
  const deliveryCharge = calculateDeliveryCharge(totalCost);
  setState('deliveryFee', deliveryCharge);
  const newtotalCost = totalCost + deliveryCharge;
  const flooredTotal = floorAndFix(newtotalCost);

  setState('total', flooredTotal);

  if (isApplied && !state.activeCampaigns.includes(RED_PLATE_CAMPAIGN.id)) {
    addActiveCampaign(RED_PLATE_CAMPAIGN.id);
  }

  if (!isApplied && state.activeCampaigns.includes(RED_PLATE_CAMPAIGN.id)) {
    const newCampaigns = state.activeCampaigns.filter(
      item => item !== RED_PLATE_CAMPAIGN.id,
    );
    setState('activeCampaigns', newCampaigns);
    publish(EVENTS.CAMPAIGN_REMOVED, RED_PLATE_CAMPAIGN);
  }
};

export const addProduct = productCode => {
  if (!PRODUCTS[productCode]) return;
  const state = getState();
  const newBasket = [...state.basket];
  newBasket.push(productCode);
  setState('basket', newBasket);
  calculateTotal();
  publish(EVENTS.PRODUCT_ADDED, {
    productCode,
    total: state.total,
    deliveryFee: state.deliveryFee,
  });
  publish(EVENTS.NOTIFICATION, 'Product added to basket');
};

export const removeProduct = productCode => {
  const state = getState();

  const productIndex = state.basket.findIndex(item => item === productCode);
  const newBasket = [...state.basket];
  newBasket.splice(productIndex, 1);
  setState('basket', newBasket);

  calculateTotal();

  publish(EVENTS.PRODUCT_REMOVED, {
    productCode,
    total: state.total,
    deliveryFee: state.deliveryFee,
  });
};

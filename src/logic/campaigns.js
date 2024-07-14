import { PRODUCTS, PRODUCTS_KEYS } from '../constants';

export const RED_PLATE_CAMPAIGN = {
  id: 'RED_PLATE_CAMPAIGN',
  name: 'Red Plate Campaign',
  description: 'Buy one red plate, get the second half price',
  checkAndCalculateTotal: ({ products }) => {
    let totalCost = 0;
    let redPlateCount = 0;

    products.forEach(item => {
      const product = PRODUCTS[item];
      totalCost += product.price;

      if (item === PRODUCTS_KEYS.R01) {
        redPlateCount += 1;
      }
    });
    const isCampaignApplicable = redPlateCount > 1;
    if (isCampaignApplicable) {
      const discount = (Math.floor(redPlateCount / 2) * PRODUCTS.R01.price) / 2;
      totalCost -= discount;
    }

    return { totalCost, isApplied: isCampaignApplicable };
  },
};

export const CAMPAINGS = [RED_PLATE_CAMPAIGN];

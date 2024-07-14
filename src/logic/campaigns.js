import { PRODUCTS, PRODUCTS_KEYS } from '../constants';

export const RED_PLATE_CAMPAIGN = {
  name: 'Red Plate Campaign',
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

    if (redPlateCount > 1) {
      const discount = (Math.floor(redPlateCount / 2) * PRODUCTS.R01.price) / 2;

      totalCost -= discount;
    }

    return totalCost;
  },
};

import { PRODUCTS } from '../../constants';
import { EVENTS } from '../../constants/pubSubEvents';
import { subscribe } from '../../pubsub';
import { removeProduct } from '../../reducers';
import { floorAndFix } from '../../utils/math';

import * as styles from './basket.module.scss';

const Basket = ({ parent }) => {
  const basketHoverItems = {};
  const basketContainer = document.createElement('div');
  basketContainer.dataset.testid = 'basket';
  const basketTotal = document.createElement('p');
  const deliveryFeeInfo = document.createElement('p');
  deliveryFeeInfo.textContent = 'Delivery fee: $0.00';
  deliveryFeeInfo.className = styles.deliveryFeeInfoText;

  basketTotal.textContent = 'Basket total: $0.00';
  basketContainer.className = styles.basketContainer;
  basketTotal.className = styles.basketTotal;

  basketContainer.appendChild(basketTotal);
  const basketHoverMenu = document.createElement('div');

  basketHoverMenu.className = styles.basketHoverMenu;
  basketHoverMenu.textContent = 'Basket is empty';
  basketContainer.appendChild(basketHoverMenu);

  basketContainer.onpointerenter = () => {
    basketHoverMenu.style.display = 'flex';
  };

  window.addEventListener('click', event => {
    if (!basketContainer.contains(event.target)) {
      basketHoverMenu.style.display = 'none';
    }
  });

  parent.appendChild(basketContainer);

  subscribe(EVENTS.PRODUCT_ADDED, ({ productCode, total, deliveryFee }) => {
    basketTotal.textContent = `Basket total: $${total}`;

    deliveryFeeInfo.textContent = `Delivery fee: $${deliveryFee}`;
    deliveryFeeInfo.style.display = 'block';

    if (Object.keys(basketHoverItems).length === 0) {
      basketHoverMenu.textContent = '';
    }
    if (basketHoverItems[productCode]) {
      basketHoverItems[productCode].count += 1;

      const { productCount, productPrice } =
        basketHoverItems[productCode].elements;

      productCount.textContent = basketHoverItems[productCode].count.toString();
      productPrice.textContent = `$${floorAndFix(PRODUCTS[productCode].price * basketHoverItems[productCode].count)}`;

      return;
    }
    basketHoverItems[productCode] = {
      count: 1,
    };

    const product = PRODUCTS[productCode];
    const productItem = document.createElement('div');
    const productName = document.createElement('p');
    const productPrice = document.createElement('p');
    const productCount = document.createElement('p');
    const removeButton = document.createElement('button');

    productCount.textContent = basketHoverItems[productCode].count.toString();
    removeButton.textContent = '-';
    removeButton.onclick = e => {
      e.stopPropagation();
      removeProduct(productCode);
    };
    removeButton.className = styles.removeButton;
    productItem.className = styles.productItem;
    productCount.className = styles.productCount;
    productName.className = styles.productName;
    productName.textContent = product.name;
    productPrice.textContent = `$${product.price}`;
    productPrice.className = styles.productPrice;

    basketHoverItems[productCode].elements = {
      productCount,
      productPrice,
      productItemContainer: productItem,
    };

    productItem.appendChild(productName);
    productItem.appendChild(productCount);
    productItem.appendChild(productPrice);
    productItem.appendChild(removeButton);

    basketHoverMenu.appendChild(productItem);
    basketHoverMenu.appendChild(deliveryFeeInfo);
  });

  subscribe(EVENTS.PRODUCT_REMOVED, ({ productCode, total, deliveryFee }) => {
    if (!basketHoverItems[productCode]) {
      return;
    }

    if (total > 0) {
      deliveryFeeInfo.textContent = `Delivery fee: $${deliveryFee}`;
      deliveryFeeInfo.style.display = 'block';
    } else {
      deliveryFeeInfo.style.display = 'none';
    }

    basketHoverItems[productCode].count -= 1;

    if (basketHoverItems[productCode].count === 0) {
      basketHoverItems[productCode].elements.productItemContainer.remove();
      delete basketHoverItems[productCode];
      if (Object.keys(basketHoverItems).length === 0) {
        basketHoverMenu.textContent = 'Basket is empty';
      }

      delete basketHoverItems[productCode];
    } else {
      const { productCount, productPrice } =
        basketHoverItems[productCode].elements;

      productCount.textContent = basketHoverItems[productCode].count.toString();
      productPrice.textContent = `$${floorAndFix(PRODUCTS[productCode].price * basketHoverItems[productCode].count)}`;
    }
    basketTotal.textContent = `Basket total: $${total}`;
  });
};

export default Basket;

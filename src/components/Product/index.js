import { addProduct } from '../../reducers';

import * as styles from './product.module.scss';

const Product = ({ productInfo, parent }) => {
  const productContainer = document.createElement('div');
  const productInfoContainer = document.createElement('div');
  const productName = document.createElement('h3');
  const productPrice = document.createElement('p');
  const addToBasketButton = document.createElement('button');

  productContainer.className = styles.productContainer;
  productInfoContainer.className = styles.productInfoContainer;
  productName.className = styles.productName;
  productPrice.className = styles.productPrice;
  addToBasketButton.className = styles.addToBasketButton;

  productName.textContent = productInfo.name;
  productPrice.textContent = `$${productInfo.price}`;
  addToBasketButton.textContent = 'Add to basket';

  productInfoContainer.appendChild(productName);
  productInfoContainer.appendChild(productPrice);
  productContainer.appendChild(productInfoContainer);
  productContainer.appendChild(addToBasketButton);

  addToBasketButton.onclick = () => {
    addProduct(productInfo.code);
  };

  parent.appendChild(productContainer);
};

export default Product;

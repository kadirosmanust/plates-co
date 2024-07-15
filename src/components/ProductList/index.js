import { PRODUCTS } from '../../constants';
import rootElement from '../../utils/rootElement';
import Product from '../Product';

import * as styles from './productList.module.scss';

const ProductList = () => {
  const root = rootElement();
  const productListContainer = document.createElement('div');
  productListContainer.dataset.testid = 'product-list';
  const productListTitle = document.createElement('h2');
  const container = document.createElement('div');
  container.className = styles.container;
  productListTitle.textContent = 'Products';
  productListTitle.className = styles.productListTitle;
  productListContainer.className = styles.productListContainer;

  container.appendChild(productListTitle);
  container.appendChild(productListContainer);
  root.appendChild(container);

  Object.keys(PRODUCTS).forEach(code => {
    const productInfo = PRODUCTS[code];

    Product({
      productInfo: { ...productInfo, code },
      parent: productListContainer,
    });
  });
};

export default ProductList;

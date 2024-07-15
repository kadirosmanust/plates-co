import { getByTestId, getByText } from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';

import ProductList from '../../src/components/ProductList';
import Basket from '../../src/components/Basket';
import { PRODUCTS_KEYS } from '../../src/constants';

describe('ProductList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    Basket({
      parent: document.getElementById('root'),
    });
    ProductList();
  });

  test('should render basket container', () => {
    const basket = getByTestId(document.body, 'basket');

    expect(basket).toBeInTheDocument();
  });

  test('should render product price when add', () => {
    const bluePlateAddButton = getByTestId(
      document.body,
      `add-to-basket-${PRODUCTS_KEYS.B01}`,
    );
    bluePlateAddButton.click();
    const productPrice = getByText(document.body, `Basket total: $12.90`);
    expect(productPrice).toBeInTheDocument();
  });
});

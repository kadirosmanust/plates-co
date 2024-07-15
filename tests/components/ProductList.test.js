import { getByTestId, getByText } from '@testing-library/dom';

import { subscribe } from '../../src/pubsub';
import ProductList from '../../src/components/ProductList';
// setupTest.js
import '@testing-library/jest-dom/extend-expect';
import { PRODUCTS, PRODUCTS_KEYS } from '../../src/constants';
import { EVENTS } from '../../src/constants/pubSubEvents';

describe('ProductList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    ProductList();
  });

  test('should render the product list container', () => {
    const productList = getByTestId(document.body, 'product-list');
    expect(productList).not.toBeNull();
    expect(getByText(document.body, PRODUCTS.B01.name)).toBeInTheDocument();
    expect(getByText(document.body, PRODUCTS.R01.name)).toBeInTheDocument();
    expect(getByText(document.body, PRODUCTS.G01.name)).toBeInTheDocument();
  });

  test("should subscribe to the 'PRODUCT_ADDED' event", () => {
    const mockFn = jest.fn();
    const bluePlateAddButton = getByTestId(
      document.body,
      `add-to-basket-${PRODUCTS_KEYS.B01}`,
    );
    subscribe(EVENTS.PRODUCT_ADDED, mockFn);

    bluePlateAddButton.click();

    expect(mockFn).toHaveBeenCalled();
  });
});

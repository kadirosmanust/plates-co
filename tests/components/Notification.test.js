import { getAllByTestId } from '@testing-library/dom';

import { subscribe } from '../../src/pubsub';
// setupTest.js
import '@testing-library/jest-dom/extend-expect';
import { PRODUCTS_KEYS } from '../../src/constants';
import Notification from '../../src/components/Notification';
import ProductList from '../../src/components/ProductList';
import { EVENTS } from '../../src/constants/pubSubEvents';

describe('Notification', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    ProductList();
    Notification();
  });

  test("should subscribe to the 'NOTIF' event", () => {
    const mockFn = jest.fn();
    const bluePlateAddButton = document.querySelector(
      `[data-testid="add-to-basket-${PRODUCTS_KEYS.B01}"]`,
    );
    subscribe('PRODUCT_ADDED', mockFn);
    bluePlateAddButton.click();
    expect(mockFn).toHaveBeenCalled();

    const notification = getAllByTestId(document.body, 'notification');

    expect(notification).not.toBeNull();

    subscribe(EVENTS.NOTIFICATION, mockFn);

    bluePlateAddButton.click();
  });
});

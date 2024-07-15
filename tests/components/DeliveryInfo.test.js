import { getByText } from '@testing-library/dom';

// setupTest.js
import '@testing-library/jest-dom/extend-expect';
import DeliveryFeeInfo from '../../src/components/DeliveryFeeInfo';
import { DELIVERY_FEE_TEXT } from '../../src/constants';

describe('ProductList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';

    DeliveryFeeInfo();
  });

  test('should render the Delivert Fee Info container', () => {
    const deliveryFeeInfo = getByText(document.body, DELIVERY_FEE_TEXT);
    expect(deliveryFeeInfo).toBeInTheDocument();
  });
});

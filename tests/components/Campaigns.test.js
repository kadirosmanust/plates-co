// setupTest.js
import '@testing-library/jest-dom/extend-expect';

import { getByText } from '@testing-library/dom';

import Campaigns from '../../src/components/Campaigns';
import { CAMPAINGS } from '../../src/logic/campaigns';

describe('ProductList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';

    Campaigns();
  });

  test('should render the campaigns container', () => {
    const campaigns = getByText(document.body, CAMPAINGS[0].description);
    expect(campaigns).toBeInTheDocument();
  });
});

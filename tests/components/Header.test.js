import { getByTestId } from '@testing-library/dom';

import '@testing-library/jest-dom/extend-expect';

import Header from '../../src/components/Header';

describe('ProductList', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    Header();
  });

  test('should render header and basket container', () => {
    const header = getByTestId(document.body, 'header');

    expect(header).not.toBeNull();
  });
});

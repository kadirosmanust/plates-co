import { addProduct } from '../src/reducers';
import { getState } from '../src/store';

describe('Store Tests', () => {
  beforeEach(() => {
    // Reset the store state before each test
    getState().basket = [];
    getState().total = 0;
  });

  test('initial state should be correct', () => {
    const state = getState();
    expect(state.basket).toEqual([]);
    expect(state.total).toBe(0);
  });

  test('(R)adding product should update basket and total', () => {
    addProduct('R01');
    const state = getState();
    expect(state.basket).toEqual(['R01']);
    expect(state.total).toBe('37.90');
  });

  test('(RR)adding multiple products should apply discount', () => {
    addProduct('R01');
    addProduct('R01');
    const state = getState();
    expect(state.basket).toEqual(['R01', 'R01']);
    expect(state.total).toBe('54.37');
  });

  test('(RG)adding different products should calculate total correctly', () => {
    addProduct('R01');
    addProduct('G01');
    const state = getState();
    expect(state.basket).toEqual(['R01', 'G01']);
    expect(state.total).toBe('60.85');
  });

  test('(BG)adding different products should calculate total correctly', () => {
    addProduct('B01');
    addProduct('G01');
    const state = getState();
    expect(state.basket).toEqual(['B01', 'G01']);
    expect(state.total).toBe('37.85');
  });

  test('(RRRBB)adding different products should calculate total correctly and same products', () => {
    addProduct('R01');
    addProduct('R01');
    addProduct('R01');
    addProduct('B01');
    addProduct('B01');
    const state = getState();
    expect(state.basket).toEqual(['R01', 'R01', 'R01', 'B01', 'B01']);
    expect(state.total).toBe('98.27');
  });
});

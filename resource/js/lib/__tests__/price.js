import price from '../price';

describe('price', () => {
  test('it should be get only the number of price', () => {
    expect(price.filterNominal('Rp. 50,000')).toBe(50000);
    expect(price.filterNominal('Rp. 45.000')).toBe(45000);
    expect(price.filterNominal('100.000')).toBe(100000);
  });
});

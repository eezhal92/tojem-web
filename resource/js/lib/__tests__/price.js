import { filterNominal } from '../price';

describe('price', () => {
  test('it should be get only the number of price', () => {
    expect(filterNominal('Rp. 50,000')).toBe(50000);
    expect(filterNominal('Rp. 45.000')).toBe(45000);
    expect(filterNominal('100.000')).toBe(100000);
  });
});

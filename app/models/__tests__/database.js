import db from '../index';

describe('database', () => {
  test('model name exists', () => {
    expect('user' in db).toBe(true);
    expect('product' in db).toBe(true);
    expect('store' in db).toBe(true);
  });
});

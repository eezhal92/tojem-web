import database from '../app/models';

describe('database', () => {
  test('model name exists', () => {
    expect('users' in database).toBe(true);
    expect('products' in database).toBe(true);
  });
});

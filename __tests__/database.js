import * as database from '../src/database';

describe('database', () => {
  test('model name exists', () => {
    expect('User' in database).toBe(true);
    expect('Post' in database).toBe(true);
    expect('Product' in database).toBe(true);
  });
});

import database from '../app/models';

describe('database', () => {
  test('model name exists', () => {
    expect('User' in database).toBe(true);
    expect('Product' in database).toBe(true);
    expect('Store' in database).toBe(true);
  });
});

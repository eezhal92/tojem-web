const sequelize = require('../sequelize');

describe('lib/sequelize', () => {
  it('should return 2 object', () => {
    expect('exec' in sequelize).toBe(true);
    expect('execSilent' in sequelize).toBe(true);
  });
});

import { UnprocessableEntityError } from '../errors';

describe('UnprocessableEntityError', () => {
  describe('length', () => {
    test('get error length', () => {
      let error;

      error = new UnprocessableEntityError({
        name: ['Should at least 5 character.'],
      });

      expect(error.length()).toBe(1);

      error = new UnprocessableEntityError({
        name: ['Should at least 5 character.'],
        price: ['Should be numeric.'],
      });

      expect(error.length()).toBe(2);
    });
  });

  describe('getMessage', () => {
    it('should return aggregated error message', () => {
      const error = new UnprocessableEntityError({
        name: ['Should at least 5 character.'],
        price: ['Should be numeric.', 'At least 1.'],
      });

      expect(error.getMessage('name')).toBe('Should at least 5 character.');
      expect(error.getMessage('price')).toBe('Should be numeric. At least 1.');
    });

    it('should return null when error for spesific field does not exists', () => {
      const error = new UnprocessableEntityError();

      expect(error.getMessage('description')).toBe(null);
    });
  });

  describe('getOldInput', () => {
    it('should return correct value', () => {
      const error = new UnprocessableEntityError({
        name: ['Should at least 5 character.'],
        price: ['Should be numeric.', 'At least 1.'],
      }, {
        name: 'Baks',
      });

      expect(error.getOldInput('name')).toBe('Baks');
    });

    it('should return empty string when old input does not exists', () => {
      const error = new UnprocessableEntityError();

      expect(error.getOldInput('price')).toBe('');
    });
  });
});

import sessionStrategy from '../session-strategy';

describe('app/lib/session', () => {
  it('should return `Object`', () => {
    expect(typeof sessionStrategy('test') === 'object').toBe(true);
    expect(Array.isArray(sessionStrategy('test'))).toBe(false);
  });

  it('should return memory session environment', () => {
    expect('store' in sessionStrategy('test')).toBe(false);
  });

  it('should return database session environment', () => {
    const Provider = jest.fn().mockImplementationOnce();

    const dbSession = sessionStrategy('development', { Provider });

    expect('store' in dbSession).toBe(true);
  });

  it('should thrown an error if no `env`', () => {
    expect(() => sessionStrategy()).toThrowError('session: `env` must be set');
  });
});

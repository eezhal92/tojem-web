import session from '../session';

describe('app/middlewares/session', () => {
  it('should return `Object`', () => {
    expect(typeof session('test') === 'object').toBe(true);
    expect(Array.isArray(session('test'))).toBe(false);
  });

  it('should return memory session environment', () => {
    expect('store' in session('test')).toBe(false);
  });

  it('should return database session environment', () => {
    const Provider = jest.fn().mockImplementationOnce();

    const dbSession = session('development', { Provider });

    expect('store' in dbSession).toBe(true);
  });

  it('should thrown an error if no `env`', () => {
    expect(() => session()).toThrowError('session: `env` must be set');
  });
});

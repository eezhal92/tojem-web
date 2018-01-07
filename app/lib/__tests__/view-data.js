import viewData from '../view-data';

describe('lib/view-data', () => {
  it('can create, set and retrieve view data for specific session id', () => {
    const sessionId = 'test-sid';

    viewData.createFor(sessionId);

    viewData.setFor(sessionId, 'username', 'Johny');
    viewData.setFor(sessionId, 'storeName', 'Awesome');

    expect(viewData.getFor(sessionId)).toEqual({
      username: 'Johny',
      storeName: 'Awesome',
    });
  });

  describe('getFor', () => {
    it('should throw error when session id is not found', () => {
      expect(() => {
        viewData.getFor('non-existent-sid');
      }).toThrow();
    });
  });

  describe('wrapFor', () => {
    test('default view data should be merged with passed data', () => {
      const sessionId = 'test-sid-2';

      viewData.createFor(sessionId);

      viewData.setFor(sessionId, 'key', 'val');

      expect(viewData.wrapFor(sessionId, { message: 'Hello' })).toEqual({
        message: 'Hello',
        viewData: {
          key: 'val',
        },
      });
    });

    test('return default view data when no passed data provided', () => {
      const sessionId = 'test-sid-2';

      viewData.createFor(sessionId);

      viewData.setFor(sessionId, 'key', 'val');

      expect(viewData.wrapFor(sessionId)).toEqual({
        viewData: {
          key: 'val',
        },
      });
    });
  });

  describe('wrapForRequest', () => {
    const sessionId = 'test-sid-4';

    viewData.createFor(sessionId);
    viewData.setFor(sessionId, 'key', 'val');

    it('should throw error when request does not have session object', () => {
      const request = {};

      expect(() => {
        viewData.wrapForRequest(request, { message: 'hello' });
      }).toThrow('request object does not have session property');
    });

    it('should throw error when session object does not have id attribute', () => {
      const request = {
        session: {},
      };

      expect(() => {
        viewData.wrapForRequest(request, { message: 'hello' });
      }).toThrow('session within request object does not have id property');
    });

    it('should return wrapped data', () => {
      const request = {
        session: { id: sessionId },
      };

      expect(viewData.wrapForRequest(request, { message: 'hello' }))
        .toEqual({
          message: 'hello',
          viewData: {
            key: 'val',
          },
        });
    });
  });

  describe('destroyFor', () => {
    it('should remove view data for given session id', () => {
      const sessionId = 'test-sid-3';

      viewData.createFor(sessionId);

      viewData.setFor(sessionId, 'key', 'val');

      expect(viewData.getFor(sessionId)).toEqual({
        key: 'val',
      });

      viewData.destroyFor(sessionId);

      expect(() => {
        viewData.getFor(sessionId);
      }).toThrow();
    });
  });
});

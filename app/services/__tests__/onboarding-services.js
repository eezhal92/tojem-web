import { OnBoardingService } from '../onboarding-service';

describe('app/service/onboarding-service', () => {
  const db = {
    store: {
      create: jest.fn(n => Promise.resolve(n)),
    },
  };
  const input = {
    ownerId: 1,
    name: 'Toko Makmur',
    location: 'Parigi',
    address: 'Jl. Abcdefg No. 101',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('create store', () => {
    it('should create a new record', async () => {
      const obService = new OnBoardingService(db);

      await obService.create(input);

      expect(db.store.create).toBeCalledWith(input);
      expect(db.store.create).toHaveBeenCalledTimes(1);
    });
  });
});

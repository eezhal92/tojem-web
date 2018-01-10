import paginationMeta from '../pagination';

describe('paginationMeta', () => {
  it('should give correct output', () => {
    const args = {
      limit: 10,
      total: 32,
    };

    expect(paginationMeta({
      ...args,
      page: 1,
    })).toEqual({
      limit: 10,
      page: 1,
      resultRowCount: 10,
      totalRowCount: 32,
      nextPage: 2,
      previousPage: null,
      pageCount: 4,
    });

    expect(paginationMeta({
      ...args,
      page: 2,
    })).toEqual({
      limit: 10,
      page: 2,
      resultRowCount: 10,
      totalRowCount: 32,
      nextPage: 3,
      previousPage: 1,
      pageCount: 4,
    });

    expect(paginationMeta({
      ...args,
      page: 3,
    })).toEqual({
      limit: 10,
      page: 3,
      resultRowCount: 10,
      totalRowCount: 32,
      nextPage: 4,
      previousPage: 2,
      pageCount: 4,
    });

    expect(paginationMeta({
      ...args,
      page: 4,
    })).toEqual({
      limit: 10,
      page: 4,
      resultRowCount: 2,
      totalRowCount: 32,
      nextPage: null,
      previousPage: 3,
      pageCount: 4,
    });
  });
});

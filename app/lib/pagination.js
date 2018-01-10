import chunk from 'lodash/chunk';

function paginationMeta({
  limit,
  page,
  total,
}) {
  const beginOffset = (page * limit) - limit;
  const endOffset = beginOffset + limit;

  let restRowCount;

  if (endOffset < total - 1) {
    restRowCount = 0;
  } else if (endOffset > total) {
    restRowCount = total - ((page - 1) * limit);
  }

  const hasNextResult = !restRowCount;
  const nextPage = hasNextResult ? page + 1 : null;
  const previousPage = page - 1 === 0 ? null : page - 1;

  const chunked = chunk(Array.from({ length: total }, (val, i) => i), limit);

  const resultRowCount = chunked[page - 1] !== undefined
    ? chunked[page - 1].length
    : 0;

  return {
    limit,
    page,
    resultRowCount,
    totalRowCount: total,
    nextPage,
    previousPage,
    pageCount: chunked.length,
  };
}

export default paginationMeta;

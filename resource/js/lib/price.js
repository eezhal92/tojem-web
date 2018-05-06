/**
 * Filter and get the nominal price.
 *
 * @param  {string} price
 * @return {number}
 */
export function filterNominal(price = 'Rp. 0') {
  const formattedPrice = String(price).replace(/(\D+)/g, '');

  return parseInt(formattedPrice, 10);
}

export default {
  filterNominal,
};

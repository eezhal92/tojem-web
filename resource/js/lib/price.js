/**
 * Filter and get the nominal price.
 *
 * @param  {string} price
 * @return {number}
 */
export function filterNominal(price = 'Rp. 0') {
  price = String(price).replace(/(\D+)/g, '');

  return parseInt(price, 10);
}

export default {
  filterNominal,
}

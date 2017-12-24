import Validator from 'validatorjs';
import { ORDER_TYPE_ON_SITE, ORDER_TYPE_COD } from 'app/lib/order';

/**
 * Determine if user transaction is valid.
 *
 * @param  {object}    data
 * @return {Validator}
 */
export const processTransaction = (data) => {
  const rules = {
    type: `required|in:${ORDER_TYPE_ON_SITE},${ORDER_TYPE_COD}`,
  };

  return new Validator(data, rules);
};

export default {
  processTransaction,
};

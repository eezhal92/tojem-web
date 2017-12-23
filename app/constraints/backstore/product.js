import Validator from 'validatorjs';

/**
 * Determine if product creation is valid.
 *
 * @param  {object}    data
 * @return {Validator}
 */
export const createProductConstraints = (data) => {
  const rules = {
    name: 'required|min:2',
    price: 'required|numeric|min:1',
  };

  return new Validator(data, rules);
};

export default {
  createProductConstraints,
};

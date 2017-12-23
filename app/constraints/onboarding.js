import Validator from 'validatorjs';

/**
 * Determine user registration is valid.
 *
 * @param  {object}    data
 * @return {Validator}
 */
export const onBoardingTransaction = (data) => {
  const rules = {
    name: 'required',
    location: 'required',
    address: 'required',
  };

  return new Validator(data, rules);
};

export default {
  onBoardingTransaction,
};

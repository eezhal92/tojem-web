import Validator from 'validatorjs';

const processTransaction = (data) => {
  const rules = {
    type: 'required',
  };

  return new Validator(data, rules);
};

export default {
  processTransaction,
};

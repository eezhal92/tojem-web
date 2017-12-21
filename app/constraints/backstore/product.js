import Validator from 'validatorjs';

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

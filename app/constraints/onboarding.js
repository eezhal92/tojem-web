import Validator from 'validatorjs';

const onBoardingTransaction = (data) => {
  const rules = {
    name: 'required',
    location: 'required',
    address: 'required',
  };

  return new Validator(data, rules);
};

export default onBoardingTransaction;

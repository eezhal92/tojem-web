import { shallow } from 'vue-test-utils';
import ProductItem from '../ProductItem.vue';

describe('ProductItem.vue', () => {
  it('displays default message', () => {
    const wrapper = shallow(ProductItem, {
      propsData: {
        product: {
          id: 1,
          name: 'Pizza',
          price: 40,
        },
      },
    });

    expect(wrapper.find('.product-item__name').text()).toBe('Pizza');
  });
});

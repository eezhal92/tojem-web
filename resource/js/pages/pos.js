/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import money from 'v-money';
import POSCart from '../components/POSCart.vue';
import ProductList from '../components/ProductList.vue';

Vue.use(money, { precision: 0 });

Vue.filter('rupiah', value => `Rp. ${value.toLocaleString()}`);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {
    'pos-cart': POSCart,
    'product-list': ProductList,
  },
});

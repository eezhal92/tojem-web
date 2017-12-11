/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import POSTransaction from '../components/POSTransaction.vue';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {
    'pos-transaction': POSTransaction,
  },
});

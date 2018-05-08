/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue';
import VMoney from 'v-money';
/* eslint-enable import/no-extraneous-dependencies */

import Notification from '../../plugins/notification';
import ProductCreate from '../../components/ProductCreate.vue';

Vue.use(Notification);
Vue.use(VMoney, { precision: 0 });

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {
    ProductCreate,
  },
});

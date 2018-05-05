import Vue from 'vue';
import VMoney from 'v-money';
import ProductCreate from '../../components/ProductCreate.vue';

Vue.use(VMoney, { precision: 0 });

new Vue({
  el: '#app',
  components: {
    ProductCreate,
  },
});

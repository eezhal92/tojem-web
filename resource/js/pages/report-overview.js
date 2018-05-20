/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import axios from 'axios';
import SalesChannelType from '../components/Report/SalesChannelType.vue';
import SalesAmountOverview from '../components/Report/SalesAmountOverview.vue';
import SalesNumberOverview from '../components/Report/SalesNumberOverview.vue';
import SalesProfitOverview from '../components/Report/SalesProfitOverview.vue';

Vue.filter('rupiah', value => `Rp. ${value.toLocaleString()}`);

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  data: {
    dateCode: 'last_7_days',
    sales: [],
  },
  created() {
    this.fetchSales(this.dateCode);
  },
  methods: {
    setDateCode(event) {
      this.dateCode = event.target.value;
      this.fetchSales(event.target.value);
    },
    fetchSales(dateCode) {
      return axios.get(`/api/reports/1/orders?date_code=${dateCode}`)
        .then(response => response.data)
        .then((data) => {
          this.sales = data.result;
        });
    },
  },
  computed: {
    dateFormat() {
      if (this.dateCode === 'today') {
        return 'YYYY-MM-DD HH:00:00';
      }

      return 'YYYY-MM-DD';
    },
  },
  components: {
    SalesChannelType,
    SalesAmountOverview,
    SalesNumberOverview,
    SalesProfitOverview,
  },
});

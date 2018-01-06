/* eslint-disable import/no-extraneous-dependencies */

import Vue from 'vue';
import axios from 'axios';
import SalesAmountOverview from '../components/SalesAmountOverview.vue';
import SalesNumberOverview from '../components/SalesNumberOverview.vue';
import SalesChannel from '../components/SalesChannel.vue';
import SalesChannelType from '../components/SalesChannelType.vue';

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
  components: {
    SalesAmountOverview,
    SalesNumberOverview,
    SalesChannel,
    SalesChannelType,
  },
});

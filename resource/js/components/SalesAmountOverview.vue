<template>
  <div class="sales-amount-overview">
    <div class="flex">
      <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Penjualan</p>
        <p class="text-3xl">{{ totalAmount | rupiah }}</p>
      </div>
    </div>
    <div>
      <div id="chart"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

export default {
  props: ['sales'],
  computed: {
    totalAmount() {
      return this.sales.reduce((total, sale) => total + sale.amount, 0);
    },
  },
};
</script>

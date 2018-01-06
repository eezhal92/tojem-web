<template>
  <div class="sales-number-overview">
    <div class="flex">
      <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Angka Transaksi</p>
        <p class="text-3xl">{{ transactionNumber }}</p>
      </div>
      <div class="text-black xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Item Terjual</p>
        <p class="text-3xl">{{ itemsSold }}</p>
      </div>
    </div>
    <div>
      <div id="chart-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sales'],

  computed: {
    transactionNumber() {
      return this.sales.length;
    },
    itemsSold() {
      return this.sales.reduce((total, sale) => total + sale.itemsCount, 0);
    },
  },
};
</script>

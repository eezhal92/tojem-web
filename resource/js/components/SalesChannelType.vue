<template>
  <div class="sales-channel-type">
    <div class="rounded p-4 bg-white border">
      <p>Channels</p>
      <p class="text-lg">Cash on Delivery {{ types.cod }}</p>
      <p class="text-lg">On-site {{ types.onSite }}</p>
      <div id="chart-offline"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sales'],

  computed: {
    types() {
      return {
        cod: this.sales.filter(sale => sale.type === 'cod').length,
        onSite: this.sales.filter(sale => sale.type === 'on_site').length,
      };
    },
  },
};
</script>

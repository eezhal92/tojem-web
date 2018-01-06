<template>
  <div class="sales-channel">
    <div class="rounded p-4 bg-white border">
      <p>Channels</p>
      <p class="text-lg">Offline {{ channels.offline }}</p>
      <p class="text-lg">Online {{ channels.online }}</p>
      <div id="chart-offline"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['sales'],

  computed: {
    channels() {
      return {
        offline: this.sales.filter(sale => sale.channel === 'offline').length,
        online: this.sales.filter(sale => sale.channel === 'online').length,
      };
    },
  },
};
</script>

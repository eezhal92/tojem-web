<template>
  <div class="sales-channel-type">
    <div class="rounded p-4 bg-white border">
      <p class="mb-4">Tipe Transaksi</p>
      <div class="border-t border-grey-lighter">
        <div id="chart-channel-type"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from '../plotly';

export default {
  props: ['sales'],
  mounted() {
    // eslint-disable-next-line
    this.plotlyEl = document.querySelector('#chart-channel-type');

    this.plotlyData = [{
      ...this.typesData,
      type: 'bar',
    }];

    Plotly.newPlot(this.plotlyEl, this.plotlyData);
  },
  computed: {
    types() {
      return {
        cod: this.sales.filter(sale => sale.type === 'cod').length,
        onSite: this.sales.filter(sale => sale.type === 'on_site').length,
      };
    },
    typesData() {
      return {
        x: ['Cash On Delivery', 'Di tempat'],
        y: [this.types.cod, this.types.onSite],
      };
    },
  },
  watch: {
    sales: {
      deep: true,
      handler() {
        this.plotlyData[0].y = [
          this.types.cod,
          this.types.onSite,
        ];

        Plotly.redraw(this.plotlyEl);
      },
    },
  },
};
</script>

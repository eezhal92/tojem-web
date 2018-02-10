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
/* eslint-disable no-undef */

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

    window.addEventListener('resize', this.redrawChart.bind(this), false);
  },

  methods: {
    redrawChart() {
      const actualResizeHandler = () => {
        Plotly.purge(this.plotlyEl);
        Plotly.newPlot(this.plotlyEl, this.plotlyData, this.layout);
      };

      // // ignore resize events as long as an actualResizeHandler execution is in the queue
      if (!this.resizeTimeout) {
        this.resizeTimeout = setTimeout(() => {
          this.resizeTimeout = null;
          actualResizeHandler();
        }, 66);
      }
    },
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

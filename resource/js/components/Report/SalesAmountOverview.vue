<template>
  <div class="sales-amount-overview">
    <div class="flex">
      <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Total Penjualan</p>
        <p class="text-3xl">{{ totalAmount | rupiah }}</p>
      </div>
    </div>
    <div class="border-t border-grey-lighter">
      <div style="width: 100%" id="chart-amount"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies, no-undef */

import axios from 'axios';
import dateFns from 'date-fns';
import groupBy from 'lodash/groupBy';

import Plotly from '../../plotly';

export default {
  props: ['sales', 'dateFormat'],

  mounted() {
    // eslint-disable-next-line
    this.plotlyEl = document.querySelector('#chart-amount');

    this.layout = {
      title: 'Sales Graph',
      xaxis: {
        title: 'Waktu',
        showgrid: false,
        zeroline: false,
      },
      yaxis: {
        title: 'Penjualan',
        showline: false,
      },
    };

    this.plotlyData = [{ ...this.salesData, type: 'scatter' }];

    Plotly.newPlot(this.plotlyEl, this.plotlyData, this.layout);

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
    totalAmount() {
      return this.sales.reduce((total, sale) => total + sale.amount, 0);
    },
    salesData() {
      const data = this.sales.map(sale => ({
        ...sale,
        date: dateFns.format(sale.date, this.dateFormat),
      }));

      const groupedData = groupBy(data, 'date');
      const accumulatedData = Object.keys(groupedData).map(date => ({
        date,
        amount: groupedData[date].map(i => i.amount).reduce((t, i) => t + i, 0),
      }));

      return {
        x: accumulatedData.map(i => i.date),
        y: accumulatedData.map(i => i.amount),
      };
    },
  },

  watch: {
    sales: {
      deep: true,
      handler(value) {
        this.plotlyData[0].x = this.salesData.x;
        this.plotlyData[0].y = this.salesData.y;

        Plotly.redraw(this.plotlyEl);
      },
    },
  },
};
</script>

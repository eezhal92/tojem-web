<template>
  <div class="sales-number-overview">
    <div class="flex">
      <div class="xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Transaksi</p>
        <p class="text-3xl">{{ transactionNumber }}</p>
      </div>
      <div class="text-black xl:w-1/4 lg:w-1/2 md:w-1/2 sm:w-full m-4 p-3 overflow-hidden hover:shadow-lg">
        <p>Item Terjual</p>
        <p class="text-3xl">{{ itemsSold }}</p>
      </div>
    </div>
    <div class="border-t border-grey-lighter">
      <div style="width: 100%" id="chart-number"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import dateFns from 'date-fns';
import groupBy from 'lodash/groupBy';

import Plotly from '../../plotly';

export default {
  props: ['sales', 'dateFormat'],

  mounted() {
    // eslint-disable-next-line
    this.plotlyEl = document.querySelector('#chart-number');

    this.layout = {
      title: 'Transaction Graph',
      xaxis: {
        title: 'Waktu',
        showgrid: false,
        zeroline: false,
      },
      yaxis: {
        title: 'Transaksi',
        showline: false,
      },
    };

    this.plotlyData = [
      { ...this.transactionData, type: 'scatter', name: 'Transaksi' },
      { ...this.soldItemsData, type: 'scatter', name: 'Item Terjual' },
    ];

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
    transactionNumber() {
      return this.sales.length;
    },
    itemsSold() {
      return this.sales.reduce((total, sale) => total + sale.itemsCount, 0);
    },
    transactionData() {
      const data = this.sales.map(sale => ({
        ...sale,
        date: dateFns.format(sale.date, this.dateFormat),
      }));

      const groupedData = groupBy(data, 'date');
      const accumulatedData = Object.keys(groupedData).map((date) => {
        const number = groupedData[date].length === 1 && !groupedData[date][0].amount
          ? 0
          : groupedData[date].length;

        return {
          date,
          number,
        };
      });

      return {
        x: accumulatedData.map(i => i.date),
        y: accumulatedData.map(i => i.number),
      };
    },
    soldItemsData() {
      const data = this.sales.map(sale => ({
        ...sale,
        date: dateFns.format(sale.date, this.dateFormat),
      }));

      const groupedData = groupBy(data, 'date');
      const accumulatedData = Object.keys(groupedData).map(date => ({
        date,
        itemsCount: groupedData[date].map(i => i.itemsCount).reduce((t, i) => t + i, 0),
      }));

      return {
        x: accumulatedData.map(i => i.date),
        y: accumulatedData.map(i => i.itemsCount),
      };
    },
  },

  watch: {
    sales: {
      deep: true,
      handler(value) {
        this.plotlyData[0].x = this.transactionData.x;
        this.plotlyData[0].y = this.transactionData.y;
        this.plotlyData[1].x = this.soldItemsData.x;
        this.plotlyData[1].y = this.soldItemsData.y;

        Plotly.redraw(this.plotlyEl);
      },
    },
  },
};
</script>

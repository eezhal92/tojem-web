<template>
  <div>
    <h3>Product List</h3>
    <product-item
      v-for="product in products"
      :key="product.id"
      :product="product">
    </product-item>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import ProductItem from './ProductItem.vue';

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('/api/products')
        .then(response => response.data)
        .then((products) => {
          this.products = products;
        });
    },
  },
  components: {
    'product-item': ProductItem,
  },
};
</script>

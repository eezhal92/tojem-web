<template>
  <div>
    <div class="my-4">
      <input v-model="searchText" class="p-2 w-full bg-white border rounded border-grey" placeholder="Cari produk">
    </div>
    <div v-if="!products.length">
      <p>Anda belum memasukkan data produk. Silakan buat terlebih dahulu</p>
      <br>
      <a href="/backstore/products/create" class="border border-grey p-2">
        <i class="mdi mdi-plus"></i> Tambah Produk
      </a>
    </div>

    <div v-if="!filteredProducts.length">
      <p>'{{ searchText }}' tidak ditemukan</p>
      <br>
      <a href="/backstore/products/create" class="border border-grey p-2">
        <i class="mdi mdi-plus"></i> Tambah Produk
      </a>
    </div>

    <product-item
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
      v-on:added="clearSearchText">
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
      searchText: '',
      products: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const searchText = this.searchText.toLowerCase();

        return product.name.toLowerCase().includes(searchText);
      });
    },
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    clearSearchText() {
      this.searchText = '';
    },
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

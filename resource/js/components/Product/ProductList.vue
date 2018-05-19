<template>
  <div class="product-list">
    <div class="my-2">
      Cari <input type="text" class="rounded p-2 border" v-model="keyword">
    </div>
    <ProductItem
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';
import * as productService from '../../services/product';

export default {
  components: {
    ProductItem,
  },

  data() {
    return {
      keyword: '',
      products: [],
    };
  },

  computed: {
    filteredProducts() {
      const keyword = this.keyword.toLowerCase();
      if (!keyword) {
        return this.products;
      }

      return this.products.filter(product => (
        product.name.toLowerCase().includes(keyword)
      ));
    },
  },

  mounted() {
    this.fetchProducts();
  },

  methods: {
    fetchProducts() {
      productService.getAll()
        .then((products) => {
          this.products = products;
        });
    },
  },
};
</script>

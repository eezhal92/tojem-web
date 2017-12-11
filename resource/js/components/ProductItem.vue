<template>
  <div class="product-item">
    <div>{{ product.name }}</div>
    <div>{{ product.price | rupiah }}</div>
    <div>
      <button @click="addToCart">Tambah ke keranjang</button>
    </div>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  props: ['product'],
  methods: {
    addToCart() {
      bus.$emit('product-item:added', this.product);
    },
  },
};
</script>

<template>
  <div class="product-item">
    <div>{{ product.name }}</div>
    <div>{{ product.price | rupiah }}</div>
    <div>
      <button @click="addToCart" :id="'add-product-item-' + product.id" class="bg-white text-xs hover:bg-blue-dark text-blue border border-blue font-bold py-2 px-4 rounded-full">Tambah ke keranjang</button>
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

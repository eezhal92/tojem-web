<template>
  <div class="product-item mb-2 border border-grey p-4">
    <div class="inline-block">
      <div class="product-item__name">{{ product.name }}</div>
      <div>{{  product.price | rupiah }}</div>
    </div>
    <button @click="addToCart" :id="'add-product-item-' + product.id" class="bg-white text-sm hover:bg-blue-dark text-blue border border-blue font-bold p-2 rounded float-right">Ke keranjang</button>
  </div>
</template>

<script>
import bus from '../bus';

export default {
  props: ['product'],
  methods: {
    addToCart() {
      bus.$emit('product-item:added', this.product);
      this.$emit('added');
    },
  },
};
</script>

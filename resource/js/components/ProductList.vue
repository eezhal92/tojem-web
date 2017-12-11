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
import ProductItem from './ProductItem.vue';

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: 'Bakso Bakar',
          price: 10000,
        },
        {
          id: 2,
          name: 'Nasi Goreng',
          price: 9000,
        },
      ],
    };
  },
  components: {
    'product-item': ProductItem,
  },
};
</script>

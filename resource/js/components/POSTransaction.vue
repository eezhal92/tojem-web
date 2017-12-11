<template>
  <div class="hello">
    <h3>Transaksi Baru</h3>
    <cart-item v-for="item in items" :item="item" key="item.id"></cart-item>
    <p><strong>Grand Total: Rp. {{ total }}</strong></p>
  </div>
</template>

<script>
import CartItem from './POSCartItem.vue';

export default {
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Bakso',
          qty: 2,
          price: 15000,
        },
        {
          id: 2,
          name: 'Gado-gado',
          qty: 1,
          price: 12000,
        },
      ],
    };
  },
  computed: {
    total() {
      return this.items.reduce((acc, current) => acc + (current.price * current.qty), 0);
    },
  },
  components: {
    'cart-item': CartItem,
  },
};
</script>

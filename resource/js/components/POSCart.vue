<template>
  <div class="hello">
    <h3>Transaksi Baru</h3>
    <cart-item v-for="item in items" :item="item" key="item.id"></cart-item>
    <p><strong>Grand Total: {{ total | rupiah }}</strong></p>
    <button class="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">Bayar</button>
  </div>
</template>

<script>
import bus from '../bus';
import CartItem from './POSCartItem.vue';

export default {
  data() {
    return {
      items: [],
    };
  },
  created() {
    bus.$on('product-item:added', (product) => {
      if (!this.alreadyInCart(product.id)) {
        this.items.push({ ...product, qty: 1 });
      } else {
        this.items = this.items.map((productItem) => {
          if (productItem.id === product.id) {
            return { ...productItem, qty: productItem.qty + 1 };
          }

          return productItem;
        });
      }
    });
  },
  methods: {
    alreadyInCart(productId) {
      return !!this.items.find(item => item.id === productId);
    },
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

<template>
  <div class="hello w-full">
    <div v-if="errorMessage" id="error-message" class="bg-red-lightest border-l-4 border-red text-red-dark p-4" role="alert">
      <p class="font-bold">Gagal</p>
      <p>{{ errorMessage }}.</p>
    </div>

    <div v-if="success" id="success-message" class="bg-teal-lightest border-l-4 border-teal text-teal-dark p-4" role="alert">
      <p class="font-bold">Berhasil</p>
      <p>Transaksi berhasil.</p>
    </div>

    <div v-show="!items.length">
      <div class="py-4">Belum ada barang.</div>
    </div>

    <cart-item v-for="item in items" :item="item" key="item.id"></cart-item>

    <div class="p-2 bg-white border border-dashed rounded-lg border-grey text-grey">
      Tambah <div class="float-right">+</div>
    </div>

    <div class="cart-amount my-2">
      <div>
        <strong>Grand Total: <span class="float-right">{{ total | rupiah }}</span></strong>
      </div>
      <div>
        <strong>Cash
          <span class="float-right">
            Rp.<input class="bg-grey-light" id="customer-cash" type="number" min="0" v-model="cash">
          </span>
        </strong>
      </div>

    </div>

    <div>
      <strong>Kembali<span class="float-right" id="customer-changes">{{ changes | rupiah }}</span></strong>
    </div>

    <div class="cart-action">
      <button @click="emptyCart" class="font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-blue text-blue hover:bg-blue hover:text-white">
        Transaksi Baru
      </button>
      <button id="pay-button" v-if="!success" @click="pay" class="font-semibold rounded-full px-4 py-1 leading-normal bg-blue border border-blue text-white hover:bg-blue hover:text-white">Bayar</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';

import bus from '../bus';
import CartItem from './POSCartItem.vue';

export default {
  data() {
    return {
      items: [],
      cash: 0,
      changes: 0,
      errorMessage: '',
      success: false,
    };
  },
  created() {
    bus.$on('product-item:added', (product) => {
      if (!this.alreadyInCart(product.id)) {
        this.items.push({ ...product, qty: 1 });

        return;
      }

      this.items = this.items.map((productItem) => {
        if (productItem.id === product.id) {
          return { ...productItem, qty: productItem.qty + 1 };
        }

        return productItem;
      });
    });
  },
  methods: {
    alreadyInCart(productId) {
      return !!this.items.find(item => item.id === productId);
    },
    validatePayment(changes) {
      if (!this.items.length) {
        this.errorMessage = 'Belum ada barang';
        return false;
      }

      if (parseInt(this.cash, 10) === 0) {
        this.errorMessage = 'Cash belum di-input';

        return false;
      }

      if (changes < 0) {
        this.errorMessage = 'Cash tidak cukup';

        return false;
      }

      return true;
    },
    clearError() {
      this.errorMessage = '';
    },
    pay() {
      this.clearError();

      const changes = parseInt(this.cash, 10) - this.total;

      if (!this.validatePayment(changes)) {
        return;
      }

      axios.post('/api/orders', {
        type: 'on_site',
        items: this.items,
      })
        .then(response => response.data)
        .then(() => {
          this.success = true;
          this.changes = changes;
        });
    },
    emptyCart() {
      this.items = [];
      this.cash = 0;
      this.changes = 0;
      this.errorMessage = '';
      this.success = false;
    },
  },
  computed: {
    total() {
      return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
    },
  },
  components: {
    'cart-item': CartItem,
  },
};
</script>

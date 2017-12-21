<template>
  <div class="hello w-full text-lg ">
    <div class="block mb-2">
      <strong>Transaksi</strong>
      <div class="float-right">
        <select v-model="type" id="order-type">
          <option value="on_site">On-site</option>
          <option value="cod">Cash On Delivery</option>
        </select>
      </div>
    </div>

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

    <cart-item v-for="item in items" :item="item" :key="item.id" v-on:removed="removeItem"></cart-item>

    <div class="cart-amount my-2">
      <div class="block mb-2">
        <strong>Grand Total: <span class="float-right">{{ total | rupiah }}</span></strong>
      </div>
      <div class="block mb-2">
        <strong>Cash
          <span class="float-right">
            <input class="bg-grey-light no-outline text-right font-bold" style="padding: 0" id="customer-cash" v-money="money" v-model.lazy="formattedCash">
          </span>
        </strong>
      </div>
      <div class="block mb-2">
        <strong>Kembali<span class="float-right" id="customer-changes">{{ changes | rupiah }}</span></strong>
      </div>
    </div>


    <div class="cart-action text-right mt-4">
      <button @click="emptyCart" class="font-semibold rounded px-6 py-2 leading-normal bg-white border border-blue text-blue hover:bg-blue hover:text-white">
        Transaksi Baru
      </button>
      <button id="pay-button" v-if="!success" @click="pay" class="font-semibold rounded px-6 py-2 leading-normal bg-blue border border-blue text-white hover:bg-blue hover:text-white">Bayar</button>
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
      type: 'on_site',
      formattedCash: 'Rp. 0',
      errorMessage: '',
      changes: 0,
      success: false,
      money: {
        decimal: '.',
        thousands: ',',
        prefix: 'Rp. ',
        suffix: '',
        precision: 0,
        masked: false,
      },
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
    removeItem(productId) {
      this.items = this.items.filter(item => item.id !== productId);
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
        type: this.type,
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
      this.type = 'on_site';
      this.changes = 0;
      this.formattedCash = 'Rp. 0';
      this.errorMessage = '';
      this.success = false;
    },
  },
  computed: {
    total() {
      return this.items.reduce((total, item) => total + (item.price * item.qty), 0);
    },
    cash() {
      const splittedString = this.formattedCash.split('Rp. ');

      return Number(splittedString[1].split(',').join(''));
    },
  },
  components: {
    'cart-item': CartItem,
  },
};
</script>

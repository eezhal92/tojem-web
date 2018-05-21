<template>
  <div class="flex">
    <div class="w-full border border-grey mb-4 rounded overflow-hidden bg-white">
      <div class="info p-4">
        <div class="inline-block">
          {{ product.name }}
          <span class="text-green">
            Rp. {{ price }}
          </span>
        </div>
        <div class="inline-block float-right">
          <button @click="toggleQuickSaveForm" class="quick-transaction border p-1 rounded">
            {{ isFormShowing ? 'Batal' : 'Terjual' }}
          </button>

          <form class="inline-block" v-if="isFormShowing" @submit.prevent="save">
            <span>Jml</span><input type="number" ref="productQty" min="1" v-model="qty" style="width: 48px" class="rounded border p-1">
            <select class="rounded border p-1" v-model="type">
              <option value="on_site">Beli di tempat</option>
              <option value="cod">COD</option>
            </select>
            <button type="submit" class="rounded bg-blue text-white p-1" title="Catat transaksi untuk ini">
              Simpan
            </button>
          </form>
        </div>
      </div>

      <div class="action p-2 text-sm bg-grey-lighter overflow-hidden">
        <div class="inline-block float-right">
          <a :href="`/backstore/products/${product.id}/edit`">Ubah</a>
          <a :href="`/backstore/products/${product.id}`">Detail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as transaction from '../../services/transaction';

export default {
  props: ['product'],

  data() {
    return {
      isFormShowing: false,
      qty: 1,
      type: 'on_site',
    };
  },

  computed: {
    price() {
      return this.product.price.toLocaleString('id');
    },
  },

  methods: {
    toggleQuickSaveForm() {
      this.isFormShowing = !this.isFormShowing;

      if (this.isFormShowing) {
        this.$nextTick(() => {
          this.$refs.productQty.select();
        });
      }
    },
    save() {
      const orders = {
        type: this.type,
        items: [{ ...this.product, qty: this.qty }],
      };

      transaction.createOrder(orders)
        .then(() => {
          alert('Berhasil mencatat produk ini sebagai terjual'); // eslint-disable-line no-alert
          this.qty = 1;
          this.toggleQuickSaveForm();
        })
        .catch((error) => {
          alert(error.message); // eslint-disable-line no-alert
        });
    },
  },
};
</script>

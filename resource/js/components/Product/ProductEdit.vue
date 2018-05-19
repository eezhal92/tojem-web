<template>
  <div class="container mx-auto px-2 sm:px-4 md:px-8 pb-4">
    <div class="flex">
      <div class="p-4 w-full">
        <h1 class="mt-1 mb-4">Edit Produk</h1>
      </div>
    </div>

    <div class="flex">
      <div class="p-4 w-full">
        <div id="edit-product-form" @keydown="clearErrorField($event)">
          <div class="mb-4">
            <label class="block mb-1" for="name">Nama</label>
            <input class="block p-1 border border-grey w-full" id="name" v-model="inputField.name" type="text" name="name" placeholder="Apa nama produk Anda?">

            <div class="text-red" v-if="errors.has('name')">
              <small>{{ errors.get('name') }}</small>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1" for="basePrice">Harga Modal</label>
            <input class="block p-1 border border-grey w-full" id="basePrice" v-model="inputField.basePrice" v-money="money" name="basePrice" placeholder="15000">

            <div class="text-red" v-if="errors.has('basePrice')">
              <small>{{ errors.get('basePrice') }}</small>
            </div>
          </div>

          <div class="mb-4">
            <label class="block mb-1" for="profit">Profit</label>
            <input class="block p-1 border border-grey w-full" id="profit" v-model="inputField.profit" v-money="money" name="profit" placeholder="15000">

            <div class="text-red" v-if="errors.has('profit')">
              <small>{{ errors.get('profit') }}</small>
            </div>
          </div>

          <div class="mb-4">
            <div class="block mb-1">Harga Jual</div>
            <span class="block p-1 border border-grey w-full">
              {{ sellPrice }}
            </span>
          </div>

          <div class="mb-4">
            <label class="block mb-1" for="description">Deskripsi</label>
            <textarea class="block p-1 border border-grey w-full" id="description" v-model="inputField.description" name="description" rows="3" placeholder="Deskripsi menarik tentang produk Anda"></textarea>

            <div class="text-red" v-if="errors.has('description')">
              <small>{{ errors.get('description') }}</small>
            </div>
          </div>

          <div class="float-right">
            <button id="restore-product-button" class="border border-blue p-2 rounded-sm text-center text-blue button-handler" @click="restoreProduct">
              Reset (Restore)
            </button>
            <button id="save-product-button" class="border border-blue p-2 rounded-sm text-center text-blue button-handler" @click="submitProduct">
              Perbaharui
            </button>
          </div>
        </div>
      </div>
    </div>

    <notification></notification>
  </div>
</template>

<script>
import price from '../../lib/price';
import FormError from '../../lib/form-error';
import productService from '../../services/product';

export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      money: price.vMoneyFormat,
      inputField: JSON.parse(this.value),
      errors: new FormError(),
    };
  },
  computed: {
      sellPrice() {
        const basePrice = price.filterNominal(this.inputField.basePrice);
        const profit = price.filterNominal(this.inputField.profit);

        return `Rp. ${(basePrice + profit).toLocaleString('id')}`;
      },
  },
  methods: {
    clearErrorField(event) {
      this.errors.delete(event.target.name);
    },
    restoreProduct() {
      this.inputField = JSON.parse(this.value);
    },
    submitProduct(event) {
      event.preventDefault();

      productService.update(this.inputField)
        .then((response) => {
          this.errors.clear();
          this.$notification(response.message);
        })
        .catch(({ response }) => {
          this.errors.set(response.data.errors);
        });
    },
  },
};
</script>

<style lang="scss">
.button-handler {
  margin-right: 0.255rem;

  &:last-child {
    margin-right: 0;
  }
}
</style>

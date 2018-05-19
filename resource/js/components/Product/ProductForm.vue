<template>
  <form id="product-form" @keydown="clearErrorField($event)">
    <div class="mb-4">
      <label class="block mb-1" for="name">Nama</label>
      <input class="block p-1 border border-grey w-full" id="name" v-model="inputField.name" type="text" name="name" placeholder="Apa nama produk Anda?">

      <div data-error="product-name" class="text-red" v-if="errors.has('name')">
        <small>{{ errors.get('name') }}</small>
      </div>
    </div>

    <div class="mb-4">
      <label class="block mb-1" for="basePrice">Harga Modal</label>
      <input
        id="basePrice"
        name="basePrice"
        placeholder="15000"
        v-model="inputField.basePrice"
        class="block p-1 border border-grey w-full"
        v-money="money"
        @blur="handleBasePriceBlur"
      >

      <div data-error="product-base-price" class="text-red" v-if="errors.has('basePrice')">
        <small>{{ errors.get('basePrice') }}</small>
      </div>
    </div>

    <div class="mb-4" v-show="isBasePriceValid && isProfitAndSellPriceDirty">
      <label class="block mb-1" for="profit">Profit</label>
      <input
        id="profit"
        name="profit"
        class="block p-1 border border-grey w-full"
        placeholder="15000"
        v-model="inputField.profit"
        v-money="money"
        @blur="handleProfitBlur"
      >

      <div data-error="product-profit" class="text-red" v-if="errors.has('profit')">
        <small>{{ errors.get('profit') }}</small>
      </div>
    </div>

    <div class="mb-4" v-show="isBasePriceValid && isProfitAndSellPriceDirty">
      <div class="block mb-1">Harga Jual</div>
      <input
        id="sellPrice"
        name="sellPrice"
        class="block p-1 border border-grey w-full"
        placeholder="15000"
        v-model="inputField.sellPrice"
        v-money="money"
        @blur="handleSellPriceBlur"
      >
    </div>

    <div class="mb-4">
      <label class="block mb-1" for="description">Deskripsi</label>
      <textarea class="block p-1 border border-grey w-full" id="description" v-model="inputField.description" name="description" rows="3" placeholder="Deskripsi menarik tentang produk Anda"></textarea>

      <div class="text-red" v-if="errors.has('description')">
        <small>{{ errors.get('description') }}</small>
      </div>
    </div>

    <slot
      name="action"
      :submitProduct="submitProduct"
      :resetForm="resetForm"
      :restoreProduct="restoreProduct"
    ></slot>

  </form>
</template>

<script>
import * as price from '../../lib/price';
import FormError from '../../lib/form-error';

const defaultInputField = {
  name: '',
  basePrice: '0',
  profit: '0',
  sellPrice: '0',
  description: '',
};

export default {
  props: {
    // Should return Promise
    resetOnSuccess: {
      type: Boolean,
      default: false,
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    product: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      money: price.vMoneyFormat,
      inputField: { ...defaultInputField },
      errors: new FormError(),
    };
  },
  mounted() {
    if (this.product) {
      const product = { ...this.product };

      delete product.price;
      delete product.productImages;

      this.inputField = product;
    }
  },
  computed: {
    isBasePriceValid() {
      return !!price.filterNominal(this.inputField.basePrice);
    },
    isProfitAndSellPriceDirty() {
      return !!this.inputField.profit || !!this.inputField.sellPrice;
    },
  },
  methods: {
    handleBasePriceBlur(e) {
      const basePrice = price.filterNominal(e.target.value);
      const profit = price.filterNominal(this.inputField.profit);
      const sellPrice = price.filterNominal(this.inputField.sellPrice);
      const profitAndSellPriceNotSet = !profit && !sellPrice;

      if (basePrice) {
        if (profitAndSellPriceNotSet) {
          this.inputField.sellPrice = basePrice;

          return;
        }

        if (profit) {
          this.inputField.sellPrice = basePrice + profit;

          return;
        }

        if (sellPrice) {
          this.inputField.profit = sellPrice - basePrice;
        }
      }
    },
    handleSellPriceBlur(e) {
      this.inputField.profit =
        price.filterNominal(e.target.value) -
        price.filterNominal(this.inputField.basePrice);
    },
    handleProfitBlur(e) {
      this.inputField.sellPrice =
        price.filterNominal(this.inputField.basePrice) +
        price.filterNominal(e.target.value);
    },
    clearErrorField(event) {
      this.errors.delete(event.target.name);
    },
    resetForm() {
      const {
        basePrice, name, profit, description,
      } = defaultInputField;

      this.inputField.name = name;
      this.inputField.basePrice = basePrice;
      this.inputField.profit = profit;
      this.inputField.description = description;
    },
    restoreProduct(event) {
      event.preventDefault();

      if (!this.product) {
        return;
      }

      this.inputField = { ...this.product };
    },
    submitProduct(event) {
      event.preventDefault();

      const fields = this.inputField;
      const basePrice = price.filterNominal(fields.basePrice);
      const profit = price.filterNominal(fields.profit);
      const sellPrice = basePrice + profit;

      const payload = {
        ...fields,
        basePrice,
        profit,
        sellPrice,
      };

      this.onSubmit(payload)
        .then((response) => {
          this.errors.clear();

          if (this.resetOnSuccess) {
            this.resetForm();
          }
        })
        .catch((error) => {
          const { response } = error;
          this.errors.set(response.data.errors);
        });
    },
  },
};
</script>

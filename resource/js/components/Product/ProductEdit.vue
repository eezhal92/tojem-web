<template>
  <div class="container mx-auto px-2 sm:px-4 md:px-8 pb-4">
    <div class="flex">
      <div class="p-4 w-full">
        <h1 class="mt-1 mb-4">Edit Produk</h1>
      </div>
    </div>

    <div class="flex">
      <div class="p-4 w-full">
        <ProductForm
          :product="product"
          :on-submit="handleProductFormSubmit"
        >

          <template slot="action" slot-scope="props">
            <div class="float-right">
              <button id="restore-product-button" class="border border-blue p-2 rounded-sm text-center text-blue button-handler" @click="props.restoreProduct">
                Reset (Restore)
              </button>
              <button id="save-product-button" class="border border-blue p-2 rounded-sm text-center text-blue button-handler" @click="props.submitProduct">
                Perbaharui
              </button>
            </div>
          </template>
        </ProductForm>
      </div>
    </div>

    <notification></notification>
  </div>
</template>

<script>
import ProductForm from './ProductForm.vue';
import * as productService from '../../services/product';

export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  components: {
    ProductForm,
  },

  data() {
    let product = null;

    try {
      product = JSON.parse(this.value);
      product.sellPrice = product.basePrice + product.profit;
    } catch (error) {
      console.warn('props.value is not valid stringified object'); // eslint-disable-line no-console
    }

    return {
      product,
    };
  },

  methods: {
    handleProductFormSubmit(product) {
      return productService.update(product).then((response) => {
        this.$notification(response.message);
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

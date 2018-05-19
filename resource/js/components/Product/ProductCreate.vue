<template>
  <div class="container mx-auto px-2 sm:px-4 md:px-8 pb-4">
    <div class="flex">
      <div class="p-4 w-full">
        <h1 class="mt-1 mb-4">Tambah Produk</h1>
      </div>
    </div>

    <div class="flex">
      <div class="p-4 w-full">
        <ProductForm
          :on-submit="handleProductFormSubmit"
          :reset-on-success="true"
        >
          <template slot="action" slot-scope="props">
            <div class="float-right">
              <button id="save-product-button" class="border border-blue p-2 rounded-sm text-center text-blue button-handler" @click="props.submitProduct">
                Tambah
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
import ProductForm from './ProductForm'
import productService from '../../services/product';

export default {
  components: {
    ProductForm
  },

  methods: {
    handleProductFormSubmit (product) {
      return productService.create(product)
        .then((response) => {
          this.$notification(response.message);
        })
    }
  }
}
</script>

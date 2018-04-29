<template>
  <div class="product-image">
    <div class="images flex-wrap">
      <div
        v-for="(image, i) in images"
        :key="image + i"
        class="images__item w-24 h-24"
      >
        <img :src="image" class="image__img">
      </div>
      <div
        @click="handleAddButtonClick"
        class="images__item add-button w-24 h-24"
        aria-role="button"
      >
        <div class="h-full flex items-center text-center">
          <span class="add-button__text">
            Tambah Gambar
          </span>
        </div>
      </div>
    </div>

    <input @change="handleFileInputChange" ref="fileInput" type="file" name="image" class="product-image__file-input">
  </div>
</template>

<script>
import axios from 'axios';
import * as productService from '../services/product';

export default {
  props: ['productId'],

  data () {
    return {
      images: [
        'http://lorempixel.com/96/96/food',
        'http://lorempixel.com/96/96/people',
        'http://lorempixel.com/96/96/people',
        // 'http://lorempixel.com/96/96/people',
      ],
    }
  },

  methods: {
    handleAddButtonClick () {
      this.triggerFileInputClick();
    },
    triggerFileInputClick () {
      this.$refs.fileInput.click();
    },
    onUploadProgress (event) {
      console.log(event)
    },
    handleFileInputChange (event) {
      productService.uploadProductImage({
        productId: this.productId,
        file: event.files[0],
        onUploadProgress: this.onUploadProgress
      })
    }
  }
}
</script>

<style lang="scss">
  .product-image {
    &__file-input {
      display: none;
    }
  }

  .images {
    display: flex;

    &__item {
      display: inline-block;
      margin-right: .5rem;
      margin-bottom: .5rem;
      border-radius: .25rem;
      background-color: #cecece;
      display: inline-block;
    }
  }

  .add-button {
    border: 2px dashed #ccc;
    background-color: transparent;
    cursor: pointer;
    &__text {
      font-size: 12px;
    }
  }
</style>

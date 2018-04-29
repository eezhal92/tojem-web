<template>
  <div class="product-image">
    <div class="images flex-wrap">
      <div
        v-for="(image, i) in images"
        :key="image.url + i"
        class="images__item w-24 h-24"
        :style="{ 'background-image': `url('${image.url}')` }"
      >
        <button @click="handleRemoveButtonClick(image.id)" class="image-remove-button">Hapus</button>
      </div>

      <div
        v-for="(image, i) in processingImages"
        :key="`pi-${i}`"
        class="images__item w-24 h-24"
      >
        <div class="images__text">Mengunggah...</div>
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

const MAXIMUM_UPLOAD = 4;

export default {
  props: ['productId', 'defaultImages'],

  data () {
    return {
      processingImages: [],
      images: [],
    }
  },

  mounted () {
    this.images = this.defaultImages;
  },

  methods: {
    handleRemoveButtonClick (imageId) {
      axios.delete(`/api/products/${this.productId}/images/${imageId}`)
        .then(() => {
          this.images = this.images.filter(image => image.id !== imageId);
        });
    },
    handleAddButtonClick () {
      this.triggerFileInputClick();
    },
    triggerFileInputClick () {
      this.$refs.fileInput.click();
    },
    onUploadProgress (event) {
      console.log(event)
    },
    validateUpload () {
      if (this.images.length === MAXIMUM_UPLOAD) {
        throw new Error('Anda telah mencapai batas maksimum unggah gambar');
      }

      if (this.processingImages.length === 1) {
        throw new Error('Mohon tunggu hingga unggahan yang ada telah selesai.');
      }
    },
    handleFileInputChange (event) {
      try {
        this.validateUpload();
      } catch (error) {
        alert(error.message);
        return;
      }

      const processingImage = Date.now();

      this.processingImages.push(processingImage)

      productService.uploadProductImage({
        productId: this.productId,
        file: event.target.files[0],
        onUploadProgress: this.onUploadProgress,
      })
        .then((data) => {
          this.processingImages = this.processingImages.filter(image => image !== processingImage);
          this.images = this.images.concat(data.images);
        })
        .catch(() => {
          this.processingImages = [];
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
      margin-right: .5rem;
      margin-bottom: .5rem;
      border-radius: .25rem;
      background-color: #cecece;
      display: inline-block;
      background-position: center;
      background-size: cover;
      position: relative;

      .image-remove-button {
        position: absolute;
        padding: .5rem;
        background: red;
        color: #fff;
        font-size: .75rem;
        top: -1rem;
        right: 0;
      }
    }

    &__text {
      font-size: .75rem;
      text-align: center;
      display: block;
      margin-top: 2rem;
    }
  }

  .add-button {
    border: 2px dashed #ccc;
    background-color: transparent;
    cursor: pointer;
    &__text {
      color: #666;
      font-size: 12px;
    }
  }
</style>

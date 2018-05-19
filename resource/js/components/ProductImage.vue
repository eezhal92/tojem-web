<template>
  <div class="product-image">
    <div class="images flex-wrap">
      <div
        v-for="(image, i) in images"
        :key="image.url + i"
        class="images__item w-24 h-24"
        :style="{ 'background-image': `url('${image.url}')` }"
      >
        <button
          @click="handleRemoveButtonClick(image.id)"
          class="image-remove-button"
          title="Hapus gambar"
        >
          <i class="mdi mdi-close"></i>
        </button>
      </div>

      <div
        v-for="(image, i) in processingImages"
        :key="`pi-${i}`"
        class="images__item w-24 h-24"
      >
        <div class="loader-wrapper">
          <div class="spinner">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
        </div>
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

    <div>
      <span class="text-sm text-black">
        <i class="mdi mdi-information"></i> Batas ukuran gambar 1.5MB
      </span>
    </div>

    <input @change="handleFileInputChange" ref="fileInput" type="file" name="image" class="product-image__file-input">
  </div>
</template>

<script>
import Loader from './Loader.vue';
import * as productService from '../services/product';

const MAXIMUM_UPLOAD = 4;

export default {
  components: {
    Loader,
  },

  props: ['productId', 'defaultImages'],

  data() {
    return {
      processingImages: [],
      images: [],
    };
  },

  mounted() {
    this.images = this.defaultImages;
  },

  methods: {
    handleRemoveButtonClick(imageId) {
      const opts = { productId: this.productId, imageId };

      productService.deleteProductImage(opts).then(() => {
        this.images = this.images.filter(image => image.id !== imageId);
      });
    },
    handleAddButtonClick() {
      this.triggerFileInputClick();
    },
    triggerFileInputClick() {
      this.$refs.fileInput.click();
    },
    validateUpload() {
      if (this.images.length === MAXIMUM_UPLOAD) {
        throw new Error('Anda telah mencapai batas maksimum unggah gambar');
      }

      if (this.processingImages.length === 1) {
        throw new Error('Mohon tunggu hingga unggahan yang ada telah selesai.');
      }
    },
    handleFileInputChange(event) {
      try {
        this.validateUpload();
      } catch (error) {
        alert(error.message); // eslint-disable-line no-alert
        return;
      }

      const processingImage = Date.now();

      this.processingImages.push(processingImage);

      productService.uploadProductImage({
        productId: this.productId,
        file: event.target.files[0],
      })
        .then((data) => {
          this.processingImages = this.processingImages.filter(image => image !== processingImage);
          this.images = this.images.concat(data.images);
        })
        .catch((error) => {
          const { data } = error.response;

          if (data.error.code === 'LIMIT_FILE_SIZE') {
            alert('Gagal mengunggah! Ukuran gambar terlalu besar.'); // eslint-disable-line no-alert
          }

          this.processingImages = [];
        });
    },
  },
};
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
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
    background-color: #cecece;
    display: inline-block;
    background-position: center;
    background-size: cover;
    position: relative;

    .image-remove-button {
      position: absolute;
      padding: 0.5rem;
      background: red;
      color: #fff;
      font-size: 0.75rem;
      top: -1rem;
      right: 0;
    }
  }

  &__text {
    font-size: 0.75rem;
    text-align: center;
    display: block;
    margin-top: 2rem;
  }
}

.loader-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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

.spinner {
  width: 40px;
  height: 40px;

  position: relative;
}

.double-bounce1,
.double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-bounce 2s infinite ease-in-out;
  animation: sk-bounce 2s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

@-webkit-keyframes sk-bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes sk-bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>

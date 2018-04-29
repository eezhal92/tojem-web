<template>
  <div class="image-carousel">
    <div class="selected-image">
      <img class="w-full" :src="selectedImageUrl" alt="">
    </div>

    <div v-if="images.length > 1" class="image-selector">
      <div
        v-for="(image, i) in images"
        :key="`${image.url}-${i}`"
        @click="selectImage(image.id)"
        class="image-selector__item"
        :class="{ 'image-selector__item--active': isSelected(image.id) }"
        :style="{ 'background-image': `url('${image.url}')` }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['images'],

  data() {
    return { selected: null };
  },

  computed: {
    selectedImageUrl () {
      const image = this.images.find(image => image.id === this.selected);

      if (!image) {
        return '';
      }

      return image.url;
    }
  },

  mounted () {
    if (this.images.length) {
      this.selected = this.images[0].id;
    }
  },

  methods: {
    selectImage (imageId) {
      this.selected = imageId;
    },
    isSelected (imageId) {
      return this.selected === imageId;
    },
  },
}
</script>

<style lang="scss">
  .image-carousel {
    padding: 0.2rem;
  }

  .image-selector {
    overflow-x: auto;
    padding: 1rem 0;

    &__item {
      width: 4rem;
      height: 4rem;
      margin-right: 1rem;
      background-size: cover;
      background-position: center;
      display: inline-block;

      &--active {
        border: 2px solid #e3342f;
      }
    }
  }
</style>


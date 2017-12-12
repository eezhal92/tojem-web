<template>
  <div class="pos-cart-item border-grey p-2 my-2 rounded-lg mt-border border-grey bg-white">
    <span>{{ item.name }} @ {{ item.price | rupiah }}</span>
    <span class="float-right">{{ item.qty * item.price | rupiah }}</span>
    <span class="float-right"><input style="width: 40px" class="p-1 border border-grey" type="number" min="1" v-model="item.qty">x</span>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

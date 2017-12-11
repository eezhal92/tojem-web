<template>
  <div class="pos-cart-item">
    <span>{{ item.name }} @ {{ item.price | rupiah }}</span>
    <span>{{ item.qty }}x</span>
    <span>{{ item.qty * item.price | rupiah }}</span>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

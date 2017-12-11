<template>
  <div class="pos-cart-item">
    <span>{{ item.name }} @ {{ item.price }}</span>
    <span>{{ item.qty }}</span>
    <span>Rp. {{ item.qty * item.price }}</span>
  </div>
</template>

<script>
export default {
  props: ['item'],
};
</script>

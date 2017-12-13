<template>
  <div class="pos-cart-item overflow-hidden border-grey p-2 my-2 rounded-lg mt-border border-grey bg-white">
    <div class="float-left">
      <div>{{ item.name }}</div>
      <div>@ {{ item.price | rupiah }}</div>
    </div>
    <div class="float-right">
      <div class="float-right">
        Qty <input
          style="width: 40px"
          class="p-1 border border-grey"
          type="number"
          min="1"
          v-model="item.qty">
      </div>
      <div>{{ item.qty * item.price | rupiah }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  watch: {
    item: {
      deep: true,
      handler(val) {
        const qty = val.qty || 1;
        // eslint-disable-next-line no-param-reassign
        val.qty = parseInt(qty, 10);
      },
    },
  },
};
</script>

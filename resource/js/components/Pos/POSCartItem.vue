<template>
  <div class="pos-cart-item overflow-hidden border-grey p-2 my-4 rounded-lg mt-border border-grey bg-white">
    <div class="mb-4">
      {{ item.name }} <small>@ {{ item.price | rupiah }}</small>
      <button class="text-red-light text-sm p-1 rounded-sm float-right" @click="removeItem">Batal</button>
    </div>
    <div>
      <div class="float-left">
        Qty <input
          style="width: 40px"
          class="p-1 border border-grey"
          type="number"
          min="1"
          @blur="checkQty"
          v-model="item.qty">
      </div>
      <div class="float-right">
        <div class="py-1 font-bold">{{ item.qty * item.price | rupiah }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    removeItem() {
      this.$emit('removed', this.item.id);
    },
    checkQty() {
      if (parseInt(this.item.qty, 10) === 0) {
        this.$emit('removed', this.item.id);
      }
    },
  },
  watch: {
    item: {
      deep: true,
      handler(val) {
        const qty = parseInt(val.qty, 10);
        // eslint-disable-next-line no-param-reassign, no-restricted-globals
        val.qty = isNaN(qty) ? 0 : qty;
      },
    },
  },
};
</script>

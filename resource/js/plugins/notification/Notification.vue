<template>
  <div class="notification-wrapper" v-if="hasNotification">
    <template v-for="entry in entries">
      <div :key="entry.id" class="notification" ref="refNotification" @click="closeNotification(entry, $event)">
        <span class="title" v-if="hasTitle(entry)">{{ entry.title }}</span>
        <span class="text">{{ entry.text }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import bus from '../../bus';

export default {
  /**
   * Name of component
   */
  name: 'Notification',

  /**
   * Default state
   */
  data() {
    return {
      entries: [],
    };
  },

  /**
   * Mounted
   */
  mounted() {
    bus.$on('push', this.push);
  },

  /**
   * Computed
   */
  computed: {
    hasNotification() {
      return this.entries.length > 0;
    },
  },

  /**
   * Methods
   */
  methods: {
    push(options) {
      const notification = {
        id: Math.random(),
        title: '',
        text: '',
        duration: 1000 * 2, // default 2000ms
      };

      if (typeof options === 'string') {
        notification.text = options;
      }

      this.entries.push(notification);
      this.autoClose(notification);
    },
    hasTitle(entry) {
      return 'title' in entry && entry.title.trim() !== '';
    },
    closeNotification(entry, $event) {
      this.entries = this.entries.filter(obj => obj.id !== entry.id);
    },
    autoClose(entry) {
      setTimeout(() => this.closeNotification(entry), entry.duration);
    },
  },
};
</script>

<style lang="scss">
.notification-wrapper {
  display: block;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .notification {
    background-color: #222;
    padding: 0.5em 1em;
    display: block;
    position: fixed;
    bottom: 0;
    color: #ffffff;
    cursor: pointer;
  }

  .title {
    display: block;
  }

  .text {
    display: block;
  }
}
</style>

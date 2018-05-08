import bus from '../../bus';
import Notification from './Notification.vue';

export default {
  install(Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Vue.component('notification', Notification);

    Vue.prototype.$notification = (notification) => { // eslint-disable-line no-param-reassign
      bus.$emit('push', notification);
    };
  },
};

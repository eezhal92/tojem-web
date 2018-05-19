// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import Shepherd from 'tether-shepherd';
import ProductList from '../../components/Product/ProductList.vue';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {
    ProductList,
  },
});

const isMobile = window.innerWidth < 768;

function initOnboarding({ force = false } = {}) {
  let alreadyOnboarded;

  try {
    alreadyOnboarded = JSON.parse(localStorage.getItem('finish_onboarding'));
  } catch (err) {
    //
  }

  if (alreadyOnboarded && !force) {
    return;
  }

  const tour = new Shepherd.Tour({
    defaults: {
      classes: 'test',
      scrollTo: true,
    },
  });

  tour.addStep('add-product-step', {
    text: 'Untuk memulai, masukkan data produk Anda',
    attachTo: '#v-step-0 right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Selanjutnya',
      action: tour.next,
    },
  });

  tour.addStep('add-transaction-step', {
    text: 'Setelah produk-produk Anda tersimpan. Klik untuk mencatat transaksi!',
    attachTo: '#v-step-1 bottom',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Selanjutnya',
      action: tour.next,
    },
  });

  tour.addStep('view-transaction', {
    text: 'Semua transaksi yang tersimpan, bisa Anda lihat di sini',
    attachTo: '#all-transaction-menu right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Selanjutnya',
      action: tour.next,
    },
    when: {
      'before-show': function () {
        if (isMobile) {
          document.querySelector('#sidebar-btn').click();
        }
      },
    },
  });

  tour.addStep('view-report', {
    text: 'Laporan performa bisnis Anda',
    attachTo: '#report-menu right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Selanjutnya',
      action: tour.next,
    },
  });

  tour.once('complete', () => {
    if (isMobile) {
      document.querySelector('#close-btn').click();
    }
    window.scrollTo(0, 0);
    localStorage.setItem('finish_onboarding', JSON.stringify(true));
  });

  tour.start();
}

if (process.env.NODE_ENV === 'development') {
  initOnboarding({ force: false });
} else {
  initOnboarding();
}

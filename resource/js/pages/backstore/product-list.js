import Shepherd from 'tether-shepherd';

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
      classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
      scrollTo: true,
    },
  });

  tour.addStep('add-product-step', {
    text: 'Untuk bisa mulai menggunakan, Tambah terlebih dahulu',
    attachTo: '#v-step-0 right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Next',
      action: tour.next,
    },
  });

  tour.addStep('add-transaction-step', {
    text: 'Ketika ada transaksi, catatlah melalui halaman tambah transaksi',
    attachTo: '#v-step-1 bottom',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Next',
      action: tour.next,
    },
  });

  tour.addStep('view-transaction', {
    text: 'Lihat semua transaksi yang telah dicatat',
    attachTo: '#all-transaction-menu right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Next',
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
    text: 'Lihat laporan',
    attachTo: '#report-menu right',
    classes: 'shepherd step-small shepherd-open shepherd-theme-arrows shepherd-transparent-text',
    buttons: {
      text: 'Next',
      action: tour.next,
    },
  });

  tour.once('complete', () => {
    if (isMobile) {
      document.querySelector('#close-btn').click();
    }
    localStorage.setItem('finish_onboarding', JSON.stringify(true));
  });

  tour.start();
}

if (process.env.NODE_ENV === 'development') {
  initOnboarding({ force: true });
} else {
  initOnboarding();
}

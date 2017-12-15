module.exports = {
  src_folders: ['e2e/tests'],
  output_folder: 'e2e/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: 'e2e/page-objects',
  globals_path: '',

  selenium: {
    start_process: true,
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    server_path: require('selenium-server').path,
    log_path: '',
    port: 4444,
    cli_args: {
      // eslint-disable-next-line global-require,import/no-extraneous-dependencies
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': '',
      'webdriver.edge.driver': '',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },

  test_runner: 'mocha',
};

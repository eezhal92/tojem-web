const fs = require('fs');
const path = require('path');

module.exports = {
  /**
   * Initialize `.env` file.
   *
   * @return {void}
   */
  init: () => {
    const envFilepath = path.resolve(process.env.NODE_PATH, '.env');

    if (fs.existsSync(envFilepath)) {
      process.stdout.write('Ok\n');
      return;
    }

    fs.createReadStream(path.resolve(process.env.NODE_PATH, '.env.example'))
      .pipe(fs.createWriteStream(envFilepath), 'utf8');

    process.stdout.write('Success: Create `.env` file.\n');
  },
};

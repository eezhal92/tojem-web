const fs = require('fs');
const path = require('path');

module.exports = {
  init: () => {
    const envFilepath = path.resolve(process.env.NODE_PATH, '.env');

    if (fs.existsSync(envFilepath)) {
      process.stdout.write('`.env` file has already exists.\n');
      return;
    }

    fs.createReadStream(path.resolve(process.env.NODE_PATH, '.env.example'))
      .pipe(fs.createWriteStream(envFilepath), 'utf8');

    process.stdout.write('Success: Create `.env` file.\n');
  },
};

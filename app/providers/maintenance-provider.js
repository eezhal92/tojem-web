import fs from 'fs';
import path from 'path';
import BaseProvider from 'tojem/providers/base-provider';

class MaintenanceProvider extends BaseProvider {
  handle() {
    const file = path.join(this.config.get('dir.storage'), 'maintenance');

    if (fs.existsSync(file)) {
      this.app.use('*', (request, response, next) => {
        response.render('error/maintenance');
      });
    }
  }
}

export default MaintenanceProvider;

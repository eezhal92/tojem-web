import os from 'os';
import http from 'http';
import cluster from 'cluster';

import app from '../app';

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

const isProd = process.env.NODE_ENV === 'production';

const createHttpServer = () => {
  http.createServer(app).listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      process.stdout.write(`\n  Server running on http://localhost:${PORT}\n`);
    }
  });
};

if (isProd) {
  if (cluster.isMaster) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      process.stdout.write(`worker ${worker.process.pid} died\n`);
    });
  } else {
    createHttpServer();
  }
} else {
  createHttpServer();
}

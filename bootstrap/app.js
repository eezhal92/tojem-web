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
      console.log('Running on PORT %s with PID %s', PORT, process.pid); // eslint-disable-line no-console
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
      // eslint-disable-next-line
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    createHttpServer();
  }
} else {
  createHttpServer();
}

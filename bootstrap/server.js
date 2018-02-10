import os from 'os';
import http from 'http';
import cluster from 'cluster';
import application from 'tojem/app';

const app = application();
const { PORT, NODE_ENV } = process.env;
const numCPUs = os.cpus().length;

const isProd = NODE_ENV === 'production';

const createHttpServer = () => {
  http.createServer(app).listen(PORT, () => {
    if (NODE_ENV !== 'production') {
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

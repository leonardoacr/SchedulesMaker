import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });
console.log('ENV locate test: ' + path.resolve(__dirname, '..', '..', '.env'))

import app from './app';

const port = 3000;

const startServer = async () => {
  await app.on('MongoDB Cloud Server Database running!', () => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  });
};

startServer();

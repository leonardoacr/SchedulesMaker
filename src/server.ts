import * as dotenv from 'dotenv';
dotenv.config();

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

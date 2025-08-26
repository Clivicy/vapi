import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/db';
import logger from './config/logger';

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error('Failed to connect to DB', err);
    process.exit(1);
  });

import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(uri);
  logger.info('MongoDB connected');
};

export default connectDB;

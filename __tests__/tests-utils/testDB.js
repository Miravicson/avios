import mongoose from 'mongoose';
import config from '../server/config';
import logger from '../server/utils/logger';

const connect = async () => {
  logger.info('opening the test database');
  mongoose.connect(config.database.test, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

const disconnect = async () => {
  logger.info('closing the test database');
  mongoose.connection.close();
};

export default {
  connect,
  disconnect,
};

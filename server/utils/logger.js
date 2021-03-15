import { createLogger, format, transports } from 'winston';
import config from '@config';

const { simple, json } = format;
const env = process.env.NODE_ENV || 'local';
const service = config.applicationName || 'avios-service';

const addSeverity = format((info) => {
  info.severity = info.level.toUpperCase();
  return info;
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    addSeverity(),
    env === 'local' || env === 'development' ? simple() : json()
  ),
  defaultMeta: { serviceContext: { service: `${env}-${service}` } },
  transports: [new transports.Console()],
  exitOnError: false, // do not exit on handled exceptions
});

const convertToString = (item) =>
  typeof item === 'string' ? item : JSON.stringify(item);

const decorateLogger = (chosenLogger) => ({
  ...chosenLogger,
  info(...args) {
    chosenLogger.info(args.map(convertToString).join(' '));
  },
  error(...args) {
    chosenLogger.error(args.map(convertToString).join(' '));
  },
});

const decoratedLogger = decorateLogger(logger);

global.logger = decoratedLogger;
export default decoratedLogger;

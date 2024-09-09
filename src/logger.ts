import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger: any = createLogger({
  level: 'info',
  format: combine(colorize(), label({ label: 'HL7' }), timestamp(), myFormat),
  transports: [new transports.Console()],
});

logger.stream = {
  write: (message: any, encoding: any) => {
    logger.info(message);
  },
};

export default logger;

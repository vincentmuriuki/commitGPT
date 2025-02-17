import { createLogger, format, transports } from 'winston';

// Set log level: only show 'error' logs in production, 'info' in development.
const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'info';

export const Logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp(),
    format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [new transports.Console()],
});

export const setupLogger = () => {
  // Only log the initialization message in development
  if (process.env.NODE_ENV !== 'production') {
    Logger.info('Logger initialized');
  }
};

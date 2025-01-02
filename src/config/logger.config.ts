import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const loggerConfig = {
  transports: [
    // Console Transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(), // Adds timestamp to logs
        winston.format.ms(), // Adds execution time
        nestWinstonModuleUtilities.format.nestLike('YourAppName', {
          prettyPrint: true, // Makes logs readable in development
        }),
      ),
    }),
    // Error File Transport
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error', // Only logs errors
    }),
    // Combined File Transport
    new winston.transports.File({
      filename: 'logs/combined.log', // All log levels
    }),
  ],
};

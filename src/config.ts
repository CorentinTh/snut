import convict from 'convict';
import { isValidCron } from 'cron-validator';

convict.addFormat({
  name: 'cron',
  validate(source) {
    if (!isValidCron(source)) throw new Error('Invalid cron');
  },
});

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  version: {
    doc: 'The app version.',
    format: String,
    default: process.env.npm_package_version,
  },
  millisBeforeOutdated: {
    doc: 'The duration in ms before an entry is outdated.',
    format: Number,
    default: 60 * 60 * 1000, // 1h
    env: 'MS_BEFORE_OUTDATED',
  },
  checkOutdatedCron: {
    doc: 'The interval to check if an entry has become outdated.',
    format: 'cron',
    default: '* * * * *', // Every 1 minutes
    env: 'CHECK_OUTDATED_CRON',
  },
  db: {
    path: {
      doc: 'Sqlite database path.',
      format: String,
      default: './db.sqlite',
      env: 'DB_PATH',
    },
  },
  rateLimit: {
    windowsMs: {
      doc: 'Timeframe for which requests are checked/remembered.',
      format: Number,
      default: 30 * 60 * 1000,
      env: 'RATELIMIT_WINDOW_MS',
    },
    max: {
      doc: 'Max number of connections during windowMs milliseconds before sending a 429 response.',
      format: Number,
      default: 20,
      env: 'RATELIMIT_MAX_CONNECTIONS',
    },
  },
});

config.validate({ allowed: 'strict' });

console.log('Using the following config: ', config.toString());

export { config };

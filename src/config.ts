import { config as dotenv } from 'dotenv';
import convict from 'convict';

dotenv();

export const schema = {
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
  checkOutdatedInterval: {
    doc: 'The interval in ms to check for outdated.',
    format: Number,
    default: 10 * 1000, // 10s
    env: 'CHECK_OUTDATED_MS',
  },
  db: {
    type: {
      doc: 'The database type',
      format: ['sqlite', 'mysql', 'postgres', 'cockroachdb', 'mariadb'],
      default: 'sqlite',
      env: 'DATABASE_TYPE',
    },
    path: {
      doc: 'Sqlite database path.',
      format: String,
      default: './db.sqlite',
      env: 'DATABASE_PATH',
    },
    url: {
      doc: 'Database connexion URL.',
      format: String,
      default: 'postgres://localhost',
      env: 'DATABASE_URL',
    },
  },
  throttle: {
    ttl: {
      doc: 'Timeframe for which requests are checked/remembered.',
      format: Number,
      default: 30 * 60 * 1000,
      env: 'THROTTLE_TTL',
    },
    limit: {
      doc: 'Max number of connections during windowMs milliseconds before sending a 429 response.',
      format: Number,
      default: 100,
      env: 'THROTTLE_LIMIT',
    },
  },
};

const config = convict(schema);

config.validate({ allowed: 'strict' });

console.log(config.getProperties());

export { config };

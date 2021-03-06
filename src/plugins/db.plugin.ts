import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';

const dbTypeMap = {
  sqlite: 'better-sqlite3',
};

function getType() {
  const type = config.get('db.type');
  return dbTypeMap[type] ?? type;
}

export default TypeOrmModule.forRoot({
  type: getType(),
  database: config.get('db.path'),
  url: config.get('db.url'),
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

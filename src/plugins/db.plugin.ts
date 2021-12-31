import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';

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
  autoLoadEntities: true,
  synchronize: true,
});

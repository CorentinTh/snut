import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
  type: 'better-sqlite3',
  database: './db.sqlite',
  autoLoadEntities: true,
  synchronize: true,
});

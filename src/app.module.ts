import { Module } from '@nestjs/common';

import DBModule from './plugins/db.plugin';
import SchedulerModule from './plugins/scheduler.plugin';
import { PasteModule } from './paste/paste.module';

@Module({
  imports: [DBModule, SchedulerModule, PasteModule],
})
export class AppModule {}

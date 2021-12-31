import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import DBModule from './plugins/db.plugin';
import SchedulerModule from './plugins/scheduler.plugin';
import { PasteModule } from './paste/paste.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { config } from './config';
import { RouteLoggerMiddleware } from './middlewares/route-logger.middleware';
@Module({
  imports: [
    DBModule,
    SchedulerModule,
    PasteModule,
    ThrottlerModule.forRoot({
      ttl: config.get('throttle.ttl'),
      limit: config.get('throttle.limit'),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RouteLoggerMiddleware).forRoutes('*');
  }
}

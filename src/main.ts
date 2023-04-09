import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { config } from './config';
import { formatDuration } from './shared/duration';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: { 'object-src': ["'self'"] },
      },
    }),
  );
  app.use(compression());

  app.useStaticAssets(join(__dirname, '../node_modules/spectre.css/dist'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.useGlobalPipes(new ValidationPipe());

  app.use((_, res, next) => {
    res.locals.version = 'v' + config.get('version');
    res.locals.ttl = formatDuration(config.get('millisBeforeOutdated'));
    next();
  });

  await app.listen(config.get('port'));
}

main();

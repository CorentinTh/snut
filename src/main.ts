import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { config } from './config';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: { 'object-src': ["'self'"] },
      },
    })
  );
  app.use(compression());

  app.useStaticAssets(join(__dirname, '../node_modules/spectre.css/dist'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  app.useGlobalPipes(new ValidationPipe());

  app.use((_, res, next) => {
    res.locals.version = 'v' + config.get('version');
    next();
  });

  await app.listen(config.get('port'));
}

main();

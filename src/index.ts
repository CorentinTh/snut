import express from 'express';
import { join } from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes';
import { config } from './config';

const app = express();
const port = config.get('port');
const isDev = config.get('env') === 'development';

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(helmet());
app.use(logger(isDev ? 'dev' : 'combined'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_, res, next) => {
  res.locals.version = 'v' + config.get('version'); // TODO replace
  next();
});

app.use('/', express.static(join(__dirname, 'public'), { maxAge: isDev ? 0 : 3600000 }));
app.use('/spectre', express.static(join(__dirname, '../node_modules/spectre.css/dist'), { maxAge: isDev ? 0 : 3600000 }));
app.use('/', routes);
app.use('*', (_, res) => res.render('error'));

app.listen(port, () => {
  console.log(`[server]: Server is running at localhost:${port}`);
});

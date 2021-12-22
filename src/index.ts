import express from 'express';
import { join } from 'path';
import logger from 'morgan';
import routes from './routes';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));

app.use(helmet());
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((_, res, next) => {
  // res.locals.version = 'v0'; // TODO replace
  next();
});

app.use('/', express.static(join(__dirname, 'public')));
app.use('/spectre', express.static(join(__dirname, '../node_modules/spectre.css/dist')));
app.use('/', routes);
app.use('*', (_, res) => res.render('error'));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at localhost:${PORT}`);
});

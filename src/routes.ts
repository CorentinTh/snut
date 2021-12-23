import { Router } from 'express';
import { randomBytes } from 'crypto';
import connector from './db';
import rateLimit from 'express-rate-limit';
import cron from 'node-cron';
import { config } from './config';

cron.schedule(config.get('checkOutdatedCron'), () => {
  console.log('checkOutdatedCron');
  connector.clearOutdated();
});

const router = Router();
const idLength = 12;
const limiter = rateLimit(config.get('rateLimit'));

router.get('/', (_, res) => {
  res.render('create');
});

router.post('/create', limiter, (req, res) => {
  const { content } = req.body;
  const id = randomBytes(idLength / 2).toString('hex');

  connector.create({ id, content });

  res.redirect('p/' + id);
});

router.get('/p/:id', limiter, (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== idLength || !id.match(/[A-Za-z0-9]+/)) return next();

  const { content } = connector.get({ id });

  res.render('view', { content });
});

export default router;

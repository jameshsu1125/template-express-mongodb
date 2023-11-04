import express, { Router } from 'express';
import serverless from 'serverless-http';
import connect from './connect';
import select from './select';

const api = express();
const router = Router();

router.get('/connect', async (_, res) => {
  const respond = await connect();
  res.status(200).json(respond);
});

router.get('/select', (_, res) => {
  select().then((respond) => {
    console.log('aa');
    res.status(200).json(respond);
  });
});

api.use('/api/', router);

export const handler = serverless(api);

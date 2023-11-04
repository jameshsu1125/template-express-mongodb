import express, { Router } from 'express';
import serverless from 'serverless-http';
import connect from './connect';

const api = express();

const router = Router();
router.get('/connect', async (req, res) => {
  const data = await connect();
  res.status(200).json(data);
});

api.use('/api/', router);

export const handler = serverless(api);

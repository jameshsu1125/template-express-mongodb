import express, { Router } from 'express';
import serverless from 'serverless-http';
import connect from './connect';
import select from './select';
import insert from './insert';
import deleteOne from './delete';
import update from './update';

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const api = express();
api.use(express.json());

const router = Router();
router.get('/connect', async (_, res) => {
  const respond = await connect();
  res.set({ 'access-control-allow-origin': '*' });
  res.status(200).json(respond);
});

router.post('/select', async (_, res) => {
  const respond = await select();
  res.set({ 'access-control-allow-origin': '*' });
  res.status(200).json(respond);
});

router.post('/insert', async (req, res) => {
  const respond = await insert(req.body);
  res.set({ 'access-control-allow-origin': '*' });
  res.status(200).json(respond);
});

router.post('/delete', async (req, res) => {
  const respond = await insert(req.body);
  res.set({ 'access-control-allow-origin': '*' });
  res.status(200).json(respond);
});

router.post('/update', async (req, res) => {
  const respond = await insert(req.body);
  res.set({ 'access-control-allow-origin': '*' });
  res.status(200).json(respond);
});

api.use('/api/', router);

export const handler = serverless(api);

import express, { Router } from 'express';
import serverless from 'serverless-http';
import connect from './connect';
import select from './select';
import insert from './insert';
import deleteOne from './delete';
import update from './update';

const api = express();
api.use(express.json());

const router = Router();
router.get('/connect', async (_, res) => {
  const respond = await connect();
  res.status(200).json(respond);
});

router.post('/select', (_, res) => {
  select().then((respond) => {
    res.status(200).json(respond);
  });
});

router.post('/insert', (req, res) => {
  insert(req.body).then((respond) => {
    res.status(200).json(respond);
  });
});

router.post('/delete', (req, res) => {
  deleteOne(req.body).then((respond) => {
    res.status(200).json(respond);
  });
});

router.post('/update', (req, res) => {
  update(req.body).then((respond) => {
    res.status(200).json(respond);
  });
});

api.use('/api/', router);

export const handler = serverless(api);

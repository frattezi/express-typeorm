import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import { User } from './entity/user.entity';

// establish database connection

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.get('/users', async function (req: Request, res: Response) {
  const users = await datasource.getRepository(User).find();
  const a = [];
  res.json(users);
});

app.get('/users/:id', async function (req: Request, res: Response) {
  const results = await datasource.getRepository(User).findOneBy({
    id: req.params.id,
  });
  return res.send(results);
});

app.post('/users', async function (req: Request, res: Response) {
  const user = await datasource.getRepository(User).create(req.body);
  const results = await datasource.getRepository(User).save(user);
  return res.send(results);
});

app.put('/users/:id', async function (req: Request, res: Response) {
  const user = await datasource.getRepository(User).findOneBy({
    id: req.params.id,
  });
  datasource.getRepository(User).merge(user, req.body);
  const results = await datasource.getRepository(User).save(user);
  return res.send(results);
});

app.delete('/users/:id', async function (req: Request, res: Response) {
  const results = await datasource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

// start express server
app.listen(3000);

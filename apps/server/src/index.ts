import { ValidateEnv } from 'utils/validateEnv';
import express, { Application } from 'express';
import cors from 'cors';
import { appRouter, mergedRouter } from 'routers';
import { POST } from '@api/webhooks-clerk/route';
import bodyParser from 'body-parser';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';

ValidateEnv();

const port = 3000;
const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.post('/api/webhooks/user', bodyParser.raw({ type: 'application/json' }), (req, res) => POST(req, res));

app.use(
  '/trpc',
  createHTTPHandler({
    router: appRouter,
  })
);

app.listen(port);

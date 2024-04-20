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
const clientUrl = process.env.NODE_ENV === 'production' ? 'https://mativated.space' : 'http://localhost:5173';

app.use(
  cors({
    credentials: true,
    origin: clientUrl,
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

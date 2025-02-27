import { ValidateEnv } from '@utils/validateEnv';
import { POST } from '@api/webhooks-clerk/route';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { mergedRouter } from 'routers';

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

console.log('Server is running.');

app.use(
  '/trpc',
  createHTTPHandler({
    router: mergedRouter,
  })
);

app.listen(port);

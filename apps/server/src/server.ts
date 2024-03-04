import { ValidateEnv } from '@utils/validateEnv';
import express, { Application } from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { mergedRouter } from '@/routers';
import { POST } from '@/api/webhooks-clerk/route';
import bodyParser from 'body-parser';
import { createContext } from '@/context';
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

app.post('/api/webhooks/user', bodyParser.raw({ type: 'application/json' }), (req, res, ctx) => POST(req, res, ctx));

app.use(
  '/trpc',
  createHTTPHandler({
    router: mergedRouter,
    createContext: createContext,
  })
);
// app.use(
//   '/trpc',
//   createExpressMiddleware({
//     router: mergedRouter,
//     createContext: createContext,
//   })
// );

app.listen(port);

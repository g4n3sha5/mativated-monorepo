import { ValidateEnv } from './utils/validateEnv';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { mergedRouter } from './routers';
import { POST } from '@api/webhooks-clerk/route';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

ValidateEnv();

const port = 3000;
const app = express();
// app.use(express);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.post('/api/webhooks/user', bodyParser.raw({ type: 'application/json' }), (req, res) => POST(req, res));

app.use(
  '/trpc',
  createExpressMiddleware({
    router: mergedRouter,
    createContext: () => {
      const prisma = new PrismaClient();
      return { prisma };
    },
  })
);
app.listen(port);

export type AppRouter = typeof mergedRouter;

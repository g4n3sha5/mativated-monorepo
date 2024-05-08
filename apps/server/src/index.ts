import { POST } from '@api/webhooks-clerk/route';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { mergedRouter } from 'routers';
import { ValidateEnv } from 'utils/validateEnv';
import Sentry from '@sentry/node';

// ValidateEnv();

const port = 3000;
const app: Application = express();
const clientUrl = process.env.NODE_ENV === 'production' ? 'https://mativated.space' : 'http://localhost:5173';

Sentry.init({
  dsn: 'https://d804a90a557df019fd9930939eb08108@o4507045392809984.ingest.us.sentry.io/4507220342931456',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    nodeProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
const onError = (err: any, req: any, res: any) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
};
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

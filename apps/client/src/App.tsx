import './index.css';
import { StrictMode, useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { RoutesRoot } from 'routes/RoutesRoot.tsx';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@mativated-monorepo/server/src/server';

const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

export async function main() {
  const result = await client.users.getUser.query();
  console.log(result);
}

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  const [backendData, setBackendData] = useState([{}]);
  main();

  return (
    <StrictMode>
      <ClerkProvider appearance={{ layout: { socialButtonsVariant: 'iconButton' } }} publishableKey={PUBLISHABLE_KEY}>
        <RoutesRoot />
      </ClerkProvider>
    </StrictMode>
  );
}

export default App;

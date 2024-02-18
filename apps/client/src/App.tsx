import './index.css';
import { StrictMode, useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { RoutesRoot } from 'routes/RoutesRoot';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '@mativated-monorepo/server/src/server';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <ClerkProvider appearance={{ layout: { socialButtonsVariant: 'iconButton' } }} publishableKey={PUBLISHABLE_KEY}>
          <RoutesRoot />
        </ClerkProvider>
      </StrictMode>
    </QueryClientProvider>
  );
}

export default App;

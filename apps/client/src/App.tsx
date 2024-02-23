import './index.css';
import { StrictMode, useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { RoutesRoot } from 'routes/RoutesRoot';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  const queryClient = new QueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <ClerkProvider
            appearance={{ layout: { socialButtonsVariant: 'iconButton' } }}
            publishableKey={PUBLISHABLE_KEY}
          >
            <RoutesRoot />
          </ClerkProvider>
        </StrictMode>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

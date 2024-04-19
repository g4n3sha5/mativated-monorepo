import './index.css';
import { StrictMode, useMemo, useState } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { RoutesRoot } from 'routes/RoutesRoot';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import { ConfirmModalController } from '@/components/common/confirmModal/ConfirmModalController';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  console.log('RUNNING');
  const [queryClient] = useState(() => new QueryClient());
  const serverUrl = useMemo(() => {
    if (import.meta.env.NODE_ENV !== 'production') return 'http://localhost:3000/trpc';
    else {
      return import.meta.env.SERVER_URL;
    }
  }, []);

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: serverUrl,
        }),
      ],
    })
  );

  console.log(import.meta.env.NODE_ENV);
  console.log(import.meta.env.SERVER_URL);
  console.log(serverUrl);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <ClerkProvider
            appearance={{ layout: { socialButtonsVariant: 'iconButton' } }}
            publishableKey={PUBLISHABLE_KEY}
          >
            <ConfirmModalController>
              <RoutesRoot />
            </ConfirmModalController>
          </ClerkProvider>
        </StrictMode>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;

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
console.log('app is working');
console.log(import.meta.env.VITE_VERCEL_ENV);
console.log(import.meta.env.VITE_SERVER_URL);
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  const serverUrl: string = useMemo(() => {
    if (import.meta.env.VITE_VERCEL_ENV !== 'production' && !import.meta.env.VITE_SERVER_URL)
      return 'http://localhost:3000/trpc';
    else {
      return import.meta.env.VITE_SERVER_URL;
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

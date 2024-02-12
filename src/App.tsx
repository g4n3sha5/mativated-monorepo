import './index.css';
import { StrictMode, useState } from 'react';
import axios from 'axios';
import { ClerkProvider } from '@clerk/clerk-react';
import { RoutesRoot } from 'routes/RoutesRoot.tsx';

axios.defaults.baseURL = 'http://localhost:3000/';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

function App() {
  const [backendData, setBackendData] = useState([{}]);
  axios.get('/api');

  return (
    <StrictMode>
      <ClerkProvider appearance={{ layout: { socialButtonsVariant: 'iconButton' } }} publishableKey={PUBLISHABLE_KEY}>
        <RoutesRoot />
      </ClerkProvider>
    </StrictMode>
  );
}

export default App;

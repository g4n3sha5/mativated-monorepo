import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@/components/home/Home.tsx';
import Layout from './components/Layout.tsx';
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// import { far } from '@fortawesome/free-regular-svg-icons';

// library.add(fas, far);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Home /> }],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;

import './index.css';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/ui/layouts/Layout.tsx';
import React from 'react';
import MatJournalLayout from './components/ui/layouts/MatJournalLayout.tsx';
import { Home } from './pages/home/Home.tsx';
import { Dashboard } from './pages/matjournal/dashboard/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ path: '/', element: <Home /> }, { path: '/matjournal' }],
  },
  // {
  //   path: '/matjournal/',
  //   element: <MatJournalLayout />,
  //   children: [{ path: '/asass', element: <Home /> }],
  // },
]);

function App() {
  return (
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>

          <Route element={<MatJournalLayout />}>
            <Route path="/matjournal" element={<Dashboard />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

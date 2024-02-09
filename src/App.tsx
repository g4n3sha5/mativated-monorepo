import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/ui/layouts/Layout.tsx';
import React from 'react';
import MatJournalLayout from './components/ui/layouts/MatJournalLayout.tsx';
import { Home } from './pages/home/Home.tsx';
import { Dashboard } from './pages/matjournal/dashboard/Dashboard.tsx';
import { AddSession } from 'pages/matjournal/addSession/AddSession.tsx';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {/* to update map? seperate files? */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>

          <Route element={<MatJournalLayout />}>
            <Route path="/mat-journal" element={<Dashboard />}></Route>
            <Route path="/add-session" element={<AddSession />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;

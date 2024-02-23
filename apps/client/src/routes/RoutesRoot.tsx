import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'components/ui/layouts/Layout';
import MatJournalLayout from 'components/ui/layouts/MatJournalLayout';
import { Home } from 'pages/home/Home';
import { Dashboard } from 'pages/matjournal/dashboard/Dashboard';
import { SignIn } from 'pages/account/signIn/SignIn';
import SignInLayout from 'components/ui/layouts/SignInLayout';
import { SignUp } from 'pages/account/signUp/SignUp';
import { CreateSession } from '@/pages/matjournal/createSession';

export const RoutesRoot = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
      </Route>

      <Route element={<SignInLayout />}>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Route>

      <Route element={<MatJournalLayout />}>
        <Route path="/mat-journal" element={<Dashboard />}></Route>
        <Route path="/create-session" element={<CreateSession />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from 'components/ui/layouts/Layout';
import SessionsLayout from 'components/ui/layouts/SessionsLayout';
import { Home } from 'pages/home/Home';
import { Dashboard } from 'pages/sessions/dashboard/Dashboard';
import { SignIn } from 'pages/account/signIn/SignIn';
import SignInLayout from 'components/ui/layouts/SignInLayout';
import { SignUp } from 'pages/account/signUp/SignUp';
import { CreateSession } from '@/pages/sessions/createSession';
import { YourSessions } from '@/pages/sessions/yourSessions';
import { NotFound } from '@/pages/notFound';

export const RoutesRoot = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<SignInLayout />}>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
      </Route>

      <Route element={<SessionsLayout />}>
        <Route path="/mat-journal/*">
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-session" element={<CreateSession />} />
          <Route path="your-sessions" element={<YourSessions />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

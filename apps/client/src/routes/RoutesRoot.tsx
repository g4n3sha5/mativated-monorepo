import AppLayout from '@/components/ui/layouts/AppLayout';
import { NotFound } from '@/pages/notFound';
import { CreateSession } from '@/pages/app/createSession';
import { YourSessions } from '@/pages/app/yourSessions';
import Layout from 'components/ui/layouts/Layout';
import SignInLayout from 'components/ui/layouts/SignInLayout';
import { SignIn } from 'pages/account/signIn/SignIn';
import { SignUp } from 'pages/account/signUp/SignUp';
import { Home } from 'pages/home/Home';
import { Dashboard } from 'pages/app/dashboard/Dashboard';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Techniques } from '@/pages/app/techniques';

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

      <Route element={<AppLayout />}>
        <Route path="/app/*">
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-session" element={<CreateSession />} />
          <Route path="your-sessions" element={<YourSessions />} />
          <Route path="techniques" element={<Techniques />} />
          <Route path="techniques" element={<Techniques />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

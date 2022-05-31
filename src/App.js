import {Routes, Route} from 'react-router-dom';

import SigninPage from './pages/signup_signin_pages/signin_page.component';
import PageNotFound from './pages/error_pages/page_not_found.component';

import PublicRoute from './components/custom_routings/public_route.components';
import PrivateRoute from './components/custom_routings/private_route.components';

import './App.css';
import SignupPage from './pages/signup_signin_pages/signup_page.component';
import Dashboard from './pages/mathgames/dashboard.component';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={
        <PublicRoute>
          <SigninPage/>
        </PublicRoute>
      }/>
       <Route path="/signup" element={
        <PublicRoute>
          <SignupPage/>
        </PublicRoute>
       }/>
       <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
       }/>
      {/*
      <Route path="/dashboard" element={
        <PrivateRoute>
          <BankStatementConverterDashboard />
        </PrivateRoute>
      }/> */}
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  </div>
  );
}

export default App;

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthForm from './pages/AuthForm';
import PrivateRoute from './router/PrivateRoute';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';


const MFE1 = lazy(() => import("mfeOne/App").then((module) => ({ default: module.default })));
const MFE2 = lazy(() => import("mfeTwo/App").then((module) => ({ default: module.default })));

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return (
    <div className="app-wrapper">
    <AuthProvider>
      <BrowserRouter>
          {isAuthenticated && <Header></Header>}

          <div className="content">
        <Suspense fallback={<div className="p-4">Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="/one" element={<PrivateRoute><MFE1 /></PrivateRoute>} />
                <Route path="/two" element={<PrivateRoute><MFE2 /></PrivateRoute>} />

          </Routes>
            </Suspense>
          </div>
          {isAuthenticated && <Footer></Footer>}
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
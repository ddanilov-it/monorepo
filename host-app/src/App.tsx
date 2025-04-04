import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './pages/AuthForm';
import PrivateRoute from './router/PrivateRoute';
import HomePage from './pages/HomePage';

// const MFE1 = lazy(() => import("mfeOne/App").then((module) => ({ default: module.default })));
// const MFE2 = lazy(() => import("mfeTwo/App").then((module) => ({ default: module.default })));
// const MFE3 = lazy(() => import("mfeThree/App").then((module) => ({ default: module.default })));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="p-4">Загрузка...</div>}>
          <Routes>
            <Route path="/" element={<AuthForm />} />
            <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            {/* <Route path="/one" element={<PrivateRoute><MFE1 /></PrivateRoute>} />
            <Route path="/two" element={<PrivateRoute><MFE2 /></PrivateRoute>} />
            <Route path="/three" element={<PrivateRoute><MFE3 /></PrivateRoute>} /> */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
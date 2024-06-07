import React from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import routes from './routes/routes';
import Error from './pages/Error/Error';
import Loginscreen from './pages/Auth/Loginscreen/Loginscreen';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';

// css
import './assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const App = () => {
  const {pathname} = useLocation();
  return (
    <>
      {pathname !== '/login' && pathname !== '/404' && <Header />}
      {pathname !== '/login' && pathname !== '/404' && <Sidebar />}
      <Routes>
        <Route path="/login" element={<Loginscreen />} />

        {routes.map(({path, element, title}) => (
          <Route key={title} path={path} element={element} />
        ))}
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
};

export default App;

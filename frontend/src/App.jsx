import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import './App.css';
import { DemoPage } from './pages/DemoPage';
import { PaymentPage } from './pages/PaymentPage';
import { PortSelectionPage } from './pages/PortSelectionPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CommonHeader } from './components/CommonHeader';
import { HeaderProvider } from './context/HeaderContext';

import { AdminPage } from './pages/AdminPage';
import { UsersHome } from './pages/UsersHome';



import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteTracker() {
  const location = useLocation();
  useEffect(() => {
    console.log("📍 Route transition:", location.pathname);
  }, [location]);
  return null;
}

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <HeaderProvider>
          <BrowserRouter>
            <CommonHeader />
            <RouteTracker />
            <Routes>
              <Route path="/" element={<Navigate to="/pay" replace />} />
              <Route path="/pay" element={<PaymentPage />} />
              
              <Route path="/usershome" element={<UsersHome />} />
              


              <Route path="/port" element={<PortSelectionPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
      </HeaderProvider>
    </ConfigProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TransactionsPage from './pages/TransactionsPage';
import { AppStateProvider } from './context/AppStateContext';
import DashboardPage from './pages/DashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import PageLayout from './components/PageLayout';

const App: React.FC = () => {
  return (
    <AppStateProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={
            <PageLayout>
              <DashboardPage />
            </PageLayout>
          } />
          <Route path="/transactions" element={
            <PageLayout>
              <TransactionsPage />
            </PageLayout>
          } />
          <Route path="/data-sources" element={
            <PageLayout>
              <DataSourcesPage />
            </PageLayout>
          } />
        </Routes>
      </Router>
    </AppStateProvider>
  );
};

export default App; 
// @ts-ignore
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <AuthPage />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/transactions" 
          element={isAuthenticated ? <TransactionsPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/transactions/new" 
          element={isAuthenticated ? <TransactionsPage /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App; 
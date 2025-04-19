// @ts-ignore
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import Transactions from './components/Transactions';

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
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/transactions" 
          element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/transactions/new" 
          element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App; 
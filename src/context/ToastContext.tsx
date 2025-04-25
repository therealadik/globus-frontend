import React, { createContext, useContext, useState, useCallback } from 'react';
import { ApiError } from '../types/api';
import Toast from '../components/Toast';

interface ToastContextType {
  showError: (error: ApiError) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<ApiError | null>(null);

  const showError = useCallback((newError: ApiError) => {
    setError(newError);
  }, []);

  const handleClose = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {error && <Toast error={error} onClose={handleClose} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}; 
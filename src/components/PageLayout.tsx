import React from 'react';
import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <NavBar />
      
      <div className={`flex-1 ${isDashboard ? 'overflow-auto' : 'overflow-hidden'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout; 
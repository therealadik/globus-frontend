import React from 'react';
import NavBar from './NavBar';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 lg:overflow-hidden overflow-auto">
      <NavBar />
      
      <div className="flex-1 lg:overflow-hidden overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout; 
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavBarProps {
  username: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ username, onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-3">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                Globus
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
              <Link
                to="/"
                className={`relative inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive('/') ? 'text-white' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">Обзор</span>
                {isActive('/') && (
                  <div className="absolute inset-0 bg-indigo-600 rounded-md" />
                )}
              </Link>
              <Link
                to="/transactions"
                className={`relative inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  isActive('/transactions') ? 'text-white' : 'text-gray-700'
                }`}
              >
                <span className="relative z-10">Транзакции</span>
                {isActive('/transactions') && (
                  <div className="absolute inset-0 bg-indigo-600 rounded-md" />
                )}
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">{username}</span>
                  <button
                    onClick={onLogout}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 
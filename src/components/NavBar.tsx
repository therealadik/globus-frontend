import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';
import { displayApiError } from '../utils/errorHandler';
import html2PDF from 'jspdf-html2canvas-pro';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const navigation = [
  { name: 'Обзор', href: '/', current: true },
  { name: 'Транзакции', href: '/transactions', current: false },
  { name: 'Источники данных', href: '/data-sources', current: false },
];

const NavBar: React.FC = () => {
  const { appState } = useAppState();
  const { showError } = useToast();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const handleDownloadReport = async () => {
    try {
      const dashboardElement = document.querySelector('.dashboard-content') as HTMLElement;
      if (!dashboardElement) {
        throw new Error('Dashboard content not found');
      }
      await html2PDF(dashboardElement, {
        jsPDF: {
          format: 'a4',
          orientation: 'portrait',
          unit: 'mm'
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true,
          scrollX: 0,
          scrollY: -window.scrollY
        },
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        output: `financial-report-${new Date().toISOString().split('T')[0]}.pdf`
      });
    } catch (error) {
      await displayApiError(error, showError);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isDashboardPage = location.pathname === '/';

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Globus
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      isActive(item.href) ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex items-center space-x-4">
              {isDashboardPage && (
                <button
                  onClick={handleDownloadReport}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Скачать отчет
                </button>
              )}
              <span className="text-gray-600">{appState.auth.username}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    
    if (!token) {
      window.location.href = '/login';
      return;
    }
    
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar username={username} onLogout={handleLogout} />
      
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Добро пожаловать, {username}!</h1>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Пример карточек с информацией */}
              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-indigo-900">Статистика</h3>
                <p className="mt-2 text-sm text-indigo-700">
                  Здесь будет отображаться статистика вашей активности
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900">Уведомления</h3>
                <p className="mt-2 text-sm text-green-700">
                  Здесь будут отображаться важные уведомления
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-purple-900">Действия</h3>
                <p className="mt-2 text-sm text-purple-700">
                  Здесь будут отображаться последние действия
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 
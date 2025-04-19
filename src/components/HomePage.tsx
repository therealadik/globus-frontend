import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [metrics, setMetrics] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    recentTransactions: []
  });

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

    // TODO: Fetch actual metrics from API
    // This is placeholder data
    setMetrics({
      totalIncome: 50000,
      totalExpenses: 35000,
      balance: 15000,
      recentTransactions: []
    });
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
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Добро пожаловать, {username}!</h1>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900">Общий доход</h3>
                <p className="mt-2 text-2xl font-bold text-green-700">
                  {metrics.totalIncome.toLocaleString()} ₽
                </p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-red-900">Общие расходы</h3>
                <p className="mt-2 text-2xl font-bold text-red-700">
                  {metrics.totalExpenses.toLocaleString()} ₽
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900">Баланс</h3>
                <p className="mt-2 text-2xl font-bold text-blue-700">
                  {metrics.balance.toLocaleString()} ₽
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Быстрые действия</h2>
              <Link 
                to="/transactions" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Все транзакции
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link 
                to="/transactions/new" 
                className="bg-indigo-50 rounded-lg p-6 hover:bg-indigo-100 transition-colors"
              >
                <h3 className="text-lg font-medium text-indigo-900">Новая транзакция</h3>
                <p className="mt-2 text-sm text-indigo-700">
                  Создать новую транзакцию дохода или расхода
                </p>
              </Link>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-purple-900">Отчеты</h3>
                <p className="mt-2 text-sm text-purple-700">
                  Просмотр и генерация финансовых отчетов
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-yellow-900">Категории</h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Управление категориями транзакций
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Последние транзакции</h2>
            <div className="text-gray-500 text-center py-4">
              Здесь будут отображаться последние транзакции
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 
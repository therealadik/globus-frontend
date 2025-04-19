import React, { useState, useEffect, useMemo } from 'react';
import NavBar from '../components/NavBar';
import BalanceOverview from '../components/BalanceOverview';
import { AppState } from '../types/app';
import { generateTransactions } from '../utils/transactionGenerator';

const Dashboard: React.FC = () => {
  const fixedTransactions = useMemo(() => generateTransactions(20), []);

  const [appState, setAppState] = useState<AppState>({
    auth: {
      token: localStorage.getItem('authToken'),
      username: localStorage.getItem('username')
    },
    transactions: {
      items: fixedTransactions,
      isLoading: false,
      error: null
    },
    metrics: {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    }
  });

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar username={appState.auth.username || ''} onLogout={handleLogout} />
      
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <BalanceOverview appState={appState} />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Последние транзакции</h2>
              <div className="space-y-4">
                {appState.transactions.items.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 border-b last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.transactionType === 'INCOME' ? 'Доход' : 'Расход'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <p className={`font-semibold ${transaction.transactionType === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.transactionType === 'INCOME' ? '+' : '-'} {transaction.amount.toLocaleString()} ₽
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
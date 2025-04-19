import React, { useState, useEffect, useMemo } from 'react';
import NavBar from '../components/NavBar';
import BalanceOverview from '../components/BalanceOverview';
import TransactionForm from '../components/TransactionForm';
import TransactionCard from '../components/TransactionCard';
import { transactionsService } from '../api/services/transactionsService';
import { Transaction } from '../types/transaction';
import { AppState } from '../types/app';
import { generateTransactions } from '../utils/transactionGenerator';

const calculateMetrics = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.transactionType === 'INCOME') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, balance: 0 }
  );
};

const Transactions: React.FC = () => {
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

  const handleTransactionSubmit = async (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    try {
      // Create local transaction first
      const newTransaction: Transaction = {
        ...data,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString()
      };

      // Send to server
      await transactionsService.create(data);

      // Update state with new transaction
      setAppState(prev => {
        const newTransactions = [newTransaction, ...prev.transactions.items];
        const metrics = calculateMetrics(newTransactions);
        metrics.balance = metrics.totalIncome - metrics.totalExpenses;

        return {
          ...prev,
          transactions: {
            ...prev.transactions,
            items: newTransactions
          },
          metrics
        };
      });
    } catch (error) {
      throw error; // Re-throw to be caught by form
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar username={appState.auth.username || ''} onLogout={handleLogout} />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <BalanceOverview appState={appState} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Transactions List */}
            <div className="bg-white shadow rounded-lg p-6 h-[720px] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">История транзакций</h2>
              <div className="space-y-4">
                {appState.transactions.items.map(transaction => (
                  <TransactionCard key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </div>

            {/* Transaction Form */}
            <div className="bg-white shadow rounded-lg p-6 h-[720px] overflow-y-auto">
              <TransactionForm onSubmit={handleTransactionSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 
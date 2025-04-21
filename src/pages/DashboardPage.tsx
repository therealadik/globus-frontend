import React from 'react';
import { useAppState } from '../context/AppStateContext';
import BalanceOverview from '../components/BalanceOverview';
import TransactionCard from '../components/TransactionCard';

const DashboardPage: React.FC = () => {
  const { appState } = useAppState();
  const recentTransactions = appState.transactions.items.slice(0, 5);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <BalanceOverview />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Последние транзакции</h2>
        <div className="space-y-4">
          {recentTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage; 
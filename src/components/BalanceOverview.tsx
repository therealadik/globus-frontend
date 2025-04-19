import React from 'react';
import { AppState } from '../types/app';

interface BalanceOverviewProps {
  appState: AppState;
}

const formatAmount = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};

const calculateMetrics = (transactions: AppState['transactions']['items']) => {
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

const BalanceOverview: React.FC<BalanceOverviewProps> = ({ appState }) => {
  const { totalIncome, totalExpenses } = calculateMetrics(appState.transactions.items);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-800">Доходы</h3>
        <p className="text-2xl font-bold text-green-600">{formatAmount(totalIncome)}</p>
      </div>
      
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-red-800">Расходы</h3>
        <p className="text-2xl font-bold text-red-600">{formatAmount(totalExpenses)}</p>
      </div>
      
      <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
        <h3 className="text-sm font-medium text-gray-800">Баланс</h3>
        <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatAmount(balance)}
        </p>
      </div>
    </div>
  );
};

export default BalanceOverview; 
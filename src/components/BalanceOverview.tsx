import React from 'react';
import { useAppState } from '../context/AppStateContext';

const BalanceOverview: React.FC = () => {
  const { appState } = useAppState();
  const { totalIncome, totalExpenses, balance } = appState.metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-800">Доходы</h3>
        <p className="text-2xl font-bold text-green-600">{totalIncome.toLocaleString()} ₽</p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-red-800">Расходы</h3>
        <p className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} ₽</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800">Баланс</h3>
        <p className="text-2xl font-bold text-blue-600">{balance.toLocaleString()} ₽</p>
      </div>
    </div>
  );
};

export default BalanceOverview;
import React from 'react';
import { IncomeExpenseComparisonDto } from '../api/generated/src/models';

interface VerticalBalanceOverviewProps {
  data: IncomeExpenseComparisonDto;
}

const VerticalBalanceOverview: React.FC<VerticalBalanceOverviewProps> = ({ data }) => {
  const { incomeAmount = 0, expenseAmount = 0 } = data;
  const balance = incomeAmount - expenseAmount;

  return (
    <div className="bg-white rounded-lg shadow p-4 h-[400px]"> {/* IMPORTANT: Fixed height for consistency */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Финансовый обзор</h3>
      <div className="flex flex-col space-y-4">
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-green-800 mb-2">Доходы</h4>
          <p className="text-2xl font-bold text-green-600">{incomeAmount.toLocaleString()} ₽</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-red-800 mb-2">Расходы</h4>
          <p className="text-2xl font-bold text-red-600">{expenseAmount.toLocaleString()} ₽</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Баланс</h4>
          <p className="text-2xl font-bold text-blue-600">{balance.toLocaleString()} ₽</p>
        </div>
      </div>
    </div>
  );
};

export default VerticalBalanceOverview; 
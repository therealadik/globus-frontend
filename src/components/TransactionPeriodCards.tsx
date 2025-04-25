import React from 'react';
import { TransactionCountByPeriodDto, TransactionCountDto } from '../api/generated/src/models';

interface TransactionPeriodCardsProps {
  data: TransactionCountByPeriodDto;
  transactionCount?: TransactionCountDto;
}

const TransactionPeriodCards: React.FC<TransactionPeriodCardsProps> = ({ data, transactionCount }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 h-[400px]"> {/* IMPORTANT: Fixed height for consistency */}
      <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">Транзакции</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-gray-800 mb-2">За год</h4>
          <p className="text-2xl font-bold text-gray-700">{data.yearlyCount || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-gray-800 mb-2">За квартал</h4>
          <p className="text-2xl font-bold text-gray-700">{data.quarterlyCount || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-gray-800 mb-2">За месяц</h4>
          <p className="text-2xl font-bold text-gray-700">{data.monthlyCount || 0}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-gray-800 mb-2">За неделю</h4>
          <p className="text-2xl font-bold text-gray-700">{data.weeklyCount || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-green-800 mb-2">Успешные</h4>
          <p className="text-2xl font-bold text-green-700">{transactionCount?.completedCount || 0}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg flex flex-col items-center">
          <h4 className="text-sm font-medium text-red-800 mb-2">Отмененные</h4>
          <p className="text-2xl font-bold text-red-700">{transactionCount?.canceledCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionPeriodCards; 
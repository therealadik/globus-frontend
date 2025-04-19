import React from 'react';
import { TransactionCardProps } from '../types/transaction';

const formatAmount = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const isIncome = transaction.transactionType === 'INCOME';
  const amountClass = isIncome ? 'text-green-600' : 'text-red-600';
  const amountSign = isIncome ? '+' : '-';

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-sm text-gray-700">
            {transaction.personType === 'PHYSICAL' ? 'Физ. лицо' : 'Юр. лицо'}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-700">
            {formatDate(transaction.createdAt)}
          </span>
        </div>
        <span className={`font-semibold ${amountClass}`}>
          {amountSign} {formatAmount(transaction.amount)}
        </span>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Банк отправителя:</span>
          <span className="font-medium text-gray-800">{transaction.bankSender}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Банк получателя:</span>
          <span className="font-medium text-gray-800">{transaction.bankReceiver}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">ИНН получателя:</span>
          <span className="font-medium text-gray-800">{transaction.innReceiver}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Категория:</span>
          <span className="font-medium text-gray-800">{transaction.category}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard; 
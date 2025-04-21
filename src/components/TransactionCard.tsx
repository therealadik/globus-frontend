import React from 'react';
import { Transaction } from '../types/transaction';
import { FaEdit } from 'react-icons/fa';
import { useAppState } from '../context/AppStateContext';

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

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB'
  }).format(amount);
};

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, onEdit }) => {
  const { appState } = useAppState();
  const isIncome = transaction.transactionType === 'INCOME';
  const amountClass = isIncome ? 'text-green-600' : 'text-red-600';
  const amountSign = isIncome ? '+' : '-';

  const isEditable = !['CONFIRMED', 'PROCESSING', 'CANCELED', 'COMPLETED', 'DELETED', 'RETURNED'].includes(transaction.status);

  const bankSender = appState.banks.find(b => b.id === transaction.bankSenderId);
  const bankReceiver = appState.banks.find(b => b.id === transaction.bankReceiverId);
  const category = appState.categories.find(c => c.id === transaction.categoryId);

  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-sm text-gray-700">
            {transaction.personType === 'PHYSICAL' ? 'Физ. лицо' : 'Юр. лицо'}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-700">
            {formatDate(transaction.transactionDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${amountClass}`}>
            {amountSign} {formatAmount(transaction.amount)}
          </span>
          {isEditable && onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
              title="Редактировать транзакцию"
            >
              <FaEdit />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Банк отправителя:</span>
          <span className="font-medium text-gray-800">{bankSender?.name || transaction.bankSenderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Банк получателя:</span>
          <span className="font-medium text-gray-800">{bankReceiver?.name || transaction.bankReceiverId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">ИНН получателя:</span>
          <span className="font-medium text-gray-800">{transaction.innReceiver}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Категория:</span>
          <span className="font-medium text-gray-800">{category?.name || transaction.categoryId}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard; 
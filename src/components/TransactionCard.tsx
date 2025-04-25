import React from 'react';
import { Transaction } from '../types/transaction';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppState } from '../context/AppStateContext';
import { transactionsService } from '../api/services/transactionsService';
import { formatAmount } from '../utils/formatters';
import { displayApiError } from '../utils/errorHandler';
import { useToast } from '../context/ToastContext';
import { TRANSACTION_STATUS_OPTIONS } from '../constants/transaction';
import { formatLocalDateTime } from '../utils/timezone';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: () => void;
  isSelected?: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'NEW':
      return 'bg-blue-100 text-blue-800';
    case 'CONFIRMED':
      return 'bg-green-100 text-green-800';
    case 'PROCESSING':
      return 'bg-yellow-100 text-yellow-800';
    case 'CANCELED':
      return 'bg-red-100 text-red-800';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800';
    case 'DELETED':
      return 'bg-gray-100 text-gray-800';
    case 'RETURNED':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TransactionCard: React.FC<TransactionCardProps> = ({ 
  transaction, 
  onEdit, 
  onDelete,
  isSelected = false 
}) => {
  const { appState, setAppState } = useAppState();
  const { showError } = useToast();
  const isIncome = transaction.transactionType === 'INCOME';
  const amountClass = isIncome ? 'text-green-600' : 'text-red-600';
  const amountSign = isIncome ? '+' : '-';

  const isEditable = !['CONFIRMED', 'PROCESSING', 'CANCELED', 'COMPLETED', 'DELETED', 'RETURNED'].includes(transaction.status);

  const bankSender = appState.banks.find(b => b.id === transaction.bankSenderId);
  const bankReceiver = appState.banks.find(b => b.id === transaction.bankReceiverId);
  const category = appState.categories.find(c => c.id === transaction.categoryId);

  const statusOption = TRANSACTION_STATUS_OPTIONS.find(s => s.value === transaction.status);
  const statusColor = getStatusColor(transaction.status);

  const handleDelete = async () => {
    try {
      await transactionsService.delete(transaction.id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      await displayApiError(error, showError);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow p-4 transition-all duration-300 ${
        isSelected 
          ? 'border-2 border-indigo-500 shadow-lg' 
          : 'border-2 border-transparent hover:border-indigo-200 hover:shadow-lg'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {transaction.personType === 'PHYSICAL' ? 'Физ. лицо' : 'Юр. лицо'}
          </span>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-700">
            {formatLocalDateTime(transaction.transactionDate)}
          </span>
          <span className="text-gray-400">•</span>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor}`}>
            {statusOption?.name || transaction.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${amountClass}`}>
            {amountSign} {formatAmount(transaction.amount)}
          </span>
          {isEditable && (
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(transaction)}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                  title="Редактировать транзакцию"
                >
                  <FaEdit className="h-4 w-4" />
                </button>
              )}
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                title="Удалить транзакцию"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
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
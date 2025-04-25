import React, { useState, useEffect } from 'react';
import { Transaction, TransactionStatus, PersonType, TransactionType, createTransaction } from '../types/transaction';
import { FaRandom } from 'react-icons/fa';
import { useAppState } from '../context/AppStateContext';
import { useToast } from '../context/ToastContext';
import FancySelect from './FancySelect';
import Switch from './Switch';
import { generateTransaction } from '../utils/mockDataGenerator';
import { formatAmount, formatPhone, formatAccount, formatDate } from '../utils/formatters';
import { PERSON_TYPE_OPTIONS, TRANSACTION_TYPE_OPTIONS, TRANSACTION_STATUS_OPTIONS } from '../constants/transaction';
import { displayApiError } from '../utils/errorHandler';

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id'>) => Promise<void>;
  initialData?: Transaction | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, initialData }) => {
  const { appState } = useAppState();
  const { showError } = useToast();
  const [formData, setFormData] = useState<Transaction>(initialData || createTransaction());
  const [displayData, setDisplayData] = useState(formatTransaction(formData));
  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setDisplayData(formatTransaction(initialData));
    }
  }, [initialData]);

  function formatTransaction(transaction: Transaction) {
    return {
      amount: transaction.amount ? formatAmount(transaction.amount) : formatAmount(0),
      bankSenderId: { id: transaction.bankSenderId, name: appState.banks.find(b => b.id === transaction.bankSenderId)?.name || '', value: transaction.bankSenderId },
      bankReceiverId: { id: transaction.bankReceiverId, name: appState.banks.find(b => b.id === transaction.bankReceiverId)?.name || '', value: transaction.bankReceiverId },
      innReceiver: transaction.innReceiver,
      accountReceiver: formatAccount(transaction.accountReceiver),
      accountSender: formatAccount(transaction.accountSender),
      categoryId: { id: transaction.categoryId, name: appState.categories.find(c => c.id === transaction.categoryId)?.name || '', value: transaction.categoryId },
      phoneReceiver: formatPhone(transaction.phoneReceiver),
      transactionDate: formatDate(transaction.transactionDate),
      status: TRANSACTION_STATUS_OPTIONS.find(s => s.value === transaction.status) || TRANSACTION_STATUS_OPTIONS[0],
      personType: PERSON_TYPE_OPTIONS.find(p => p.value === transaction.personType) || PERSON_TYPE_OPTIONS[0],
      transactionType: TRANSACTION_TYPE_OPTIONS.find(t => t.value === transaction.transactionType) || TRANSACTION_TYPE_OPTIONS[0]
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      if (!isEditing) {
        setFormData(createTransaction());
        setDisplayData(formatTransaction(createTransaction()));
      }
    } catch (error) {
      await displayApiError(error, showError);
    }
  };

  const handleRandomData = () => {
    const newTransaction = generateTransaction(appState.banks, appState.categories);
    newTransaction.id = formData.id
    setFormData(newTransaction);
    setDisplayData(formatTransaction(newTransaction));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let rawValue = value;

    if (name === 'amount') {
      rawValue = value.replace(/[^\d.]/g, '');
      const parts = rawValue.split('.');
      if (parts.length > 2) {
        rawValue = parts[0] + '.' + parts.slice(1).join('');
      }
      if (parts.length > 1) {
        rawValue = parts[0] + '.' + parts[1].slice(0, 2);
      }
      formattedValue = formatAmount(rawValue || '0');
      setFormData(prev => ({ ...prev, [name]: Number(rawValue || '0') / 100 }));
    } else if (name === 'phoneReceiver') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = formatPhone(rawValue);
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else if (name === 'accountReceiver' || name === 'accountSender') {
      rawValue = value.replace(/\D/g, '').slice(0, 20);
      formattedValue = formatAccount(rawValue);
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else if (name === 'innReceiver') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = rawValue;
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else if (name === 'transactionDate') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = formatDate(rawValue);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    setDisplayData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSelectChange = (name: string, value: { id: number; name: string; value: PersonType | TransactionType | TransactionStatus | string | number } | string) => {
    if (typeof value === 'string') {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'personType') {
        const option = PERSON_TYPE_OPTIONS.find(opt => opt.value === value);
        if (option) {
          setDisplayData(prev => ({ ...prev, [name]: option }));
        }
      } else if (name === 'transactionType') {
        const option = TRANSACTION_TYPE_OPTIONS.find(opt => opt.value === value);
        if (option) {
          setDisplayData(prev => ({ ...prev, [name]: option }));
        }
      }
    } else {
      if (['status', 'personType', 'transactionType'].includes(name)) {
        setFormData(prev => ({ ...prev, [name]: value.value }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value.id }));
      }
      setDisplayData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {isEditing ? 'Редактирование транзакции' : 'Создать транзакцию'}
        </h2>
        <button
          type="button"
          onClick={handleRandomData}
          className="inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          title="Заполнить случайными данными"
        >
          <FaRandom className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Тип лица</label>
            <Switch
              leftLabel="Физическое лицо"
              rightLabel="Юридическое лицо"
              leftValue="PHYSICAL"
              rightValue="LEGAL"
              value={formData.personType}
              onChange={(value) => handleSelectChange('personType', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Тип транзакции</label>
            <Switch
              leftLabel="Доход"
              rightLabel="Расход"
              leftValue="INCOME"
              rightValue="EXPENSE"
              value={formData.transactionType}
              onChange={(value) => handleSelectChange('transactionType', value)}
              disabled={isEditing}
            />
          </div>

          <div>
            <FancySelect
              label="Статус"
              options={TRANSACTION_STATUS_OPTIONS}
              value={displayData.status}
              onChange={(value) => handleSelectChange('status', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата транзакции</label>
              <input
                type="text"
                name="transactionDate"
                value={displayData.transactionDate}
                onChange={handleChange}
                placeholder="DD.MM.YYYY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Сумма</label>
              <input
                type="text"
                name="amount"
                value={displayData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>

            <div>
              <FancySelect
                label="Банк отправителя"
                options={appState.banks.map(bank => ({ id: bank.id, name: bank.name, value: bank.id.toString() }))}
                value={displayData.bankSenderId}
                onChange={(value) => handleSelectChange('bankSenderId', value)}
              />
            </div>

            <div>
              <FancySelect
                label="Банк получателя"
                options={appState.banks.map(bank => ({ id: bank.id, name: bank.name, value: bank.id.toString() }))}
                value={displayData.bankReceiverId}
                onChange={(value) => handleSelectChange('bankReceiverId', value)}
              />
            </div>

            <div>
              <FancySelect
                label="Категория"
                options={appState.categories.map(category => ({ id: category.id, name: category.name, value: category.id.toString() }))}
                value={displayData.categoryId}
                onChange={(value) => handleSelectChange('categoryId', value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Счет отправителя</label>
              <input
                type="text"
                name="accountSender"
                value={displayData.accountSender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Счет получателя</label>
              <input
                type="text"
                name="accountReceiver"
                value={displayData.accountReceiver}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed disabled:border-gray-200"
                disabled={isEditing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ИНН получателя</label>
              <input
                type="text"
                name="innReceiver"
                value={displayData.innReceiver}
                onChange={handleChange}
                maxLength={11}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Телефон получателя</label>
              <input
                type="text"
                name="phoneReceiver"
                value={displayData.phoneReceiver}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isEditing ? 'Сохранить изменения' : 'Создать транзакцию'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm; 
import React, { useState } from 'react';
import { Transaction } from '../types/transaction';
import Switch from './Switch';
import ApiErrorViewer from './ApiErrorViewer';
import { ApiError } from '../types/api';
import { FaRandom } from 'react-icons/fa';

const BANKS = ['Tinkoff', 'Sberbank', 'Alfabank', 'Raifeissen Bank', 'MTS Bank'];

const formatAmount = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽';
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 1) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 1)} ${numbers.slice(1)}`;
  if (numbers.length <= 7) return `${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4)}`;
  return `${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9)}`;
};

const formatAccount = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 20);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8)}`;
  return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8, 9)} ${numbers.slice(9)}`;
};

interface TransactionFormProps {
  onSubmit: (data: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Transaction, 'id' | 'createdAt'>>({
    personType: 'PHYSICAL',
    transactionType: 'INCOME',
    amount: 0,
    bankSender: '',
    bankReceiver: '',
    innReceiver: '',
    accountReceiver: '',
    category: '',
    phoneReceiver: ''
  });
  const [displayData, setDisplayData] = useState({
    amount: '0',
    bankSender: '',
    bankReceiver: '',
    innReceiver: '',
    accountReceiver: '',
    category: '',
    phoneReceiver: ''
  });
  const [error, setError] = useState<ApiError | null>(null);

  const validateForm = (): boolean => {
    const requiredFields = [
      { field: 'amount', name: 'Сумма', min: 1 },
      { field: 'bankSender', name: 'Банк отправителя' },
      { field: 'bankReceiver', name: 'Банк получателя' },
      { field: 'innReceiver', name: 'ИНН получателя', length: 12 },
      { field: 'accountReceiver', name: 'Счет получателя', length: 20 },
      { field: 'category', name: 'Категория' },
      { field: 'phoneReceiver', name: 'Телефон получателя', length: 11 }
    ];

    for (const { field, name, min, length } of requiredFields) {
      const value = formData[field as keyof typeof formData];
      
      if (!value) {
        setError({ message: `Поле "${name}" обязательно для заполнения` });
        return false;
      }

      if (min && typeof value === 'number' && value < min) {
        setError({ message: `Поле "${name}" должно быть больше 0` });
        return false;
      }

      if (length && typeof value === 'string' && value.length !== length) {
        setError({ message: `Поле "${name}" должно содержать ${length} символов` });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      
      // Reset form data
      setFormData({
        personType: 'PHYSICAL',
        transactionType: 'INCOME',
        amount: 0,
        bankSender: '',
        bankReceiver: '',
        innReceiver: '',
        accountReceiver: '',
        category: '',
        phoneReceiver: ''
      });
      
      // Reset display data
      setDisplayData({
        amount: '0',
        bankSender: '',
        bankReceiver: '',
        innReceiver: '',
        accountReceiver: '',
        category: '',
        phoneReceiver: ''
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'message' in error) {
        setError(error as ApiError);
      } else {
        setError({
          message: 'Произошла неизвестная ошибка при создании транзакции'
        });
      }
    }
  };

  const handleRandomData = () => {
    const amount = Math.floor(Math.random() * (1000000 - 50) / 100) * 100 + 50;
    const bankSender = BANKS[Math.floor(Math.random() * BANKS.length)];
    const bankReceiver = BANKS[Math.floor(Math.random() * BANKS.length)];
    const innReceiver = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
    const accountReceiver = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
    const category = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
    const phoneReceiver = '88005553535';
    const personType = Math.random() > 0.5 ? 'PHYSICAL' as const : 'LEGAL' as const;
    const transactionType = Math.random() > 0.5 ? 'INCOME' as const : 'EXPENSE' as const;

    const randomData: Omit<Transaction, 'id' | 'createdAt'> = {
      personType,
      transactionType,
      amount,
      bankSender,
      bankReceiver,
      innReceiver,
      accountReceiver,
      category,
      phoneReceiver
    };

    setFormData(randomData);
    setDisplayData({
      amount: formatAmount(amount.toString()),
      bankSender,
      bankReceiver,
      innReceiver,
      accountReceiver: formatAccount(accountReceiver),
      category,
      phoneReceiver: formatPhone(phoneReceiver)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let rawValue = value;

    if (name === 'amount') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = formatAmount(rawValue);
      setFormData(prev => ({ ...prev, [name]: Number(rawValue) }));
    } else if (name === 'phoneReceiver') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = formatPhone(rawValue);
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else if (name === 'accountReceiver') {
      rawValue = value.replace(/\D/g, '').slice(0, 20);
      formattedValue = formatAccount(rawValue);
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else if (name === 'innReceiver') {
      rawValue = value.replace(/\D/g, '').slice(0, 12);
      formattedValue = rawValue;
      setFormData(prev => ({ ...prev, [name]: rawValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    setDisplayData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSwitchChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold text-gray-900">Создать транзакцию</h2>
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
              value={formData.personType}
              onChange={(value) => handleSwitchChange('personType', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Тип транзакции</label>
            <Switch
              leftLabel="Доход"
              rightLabel="Расход"
              value={formData.transactionType}
              onChange={(value) => handleSwitchChange('transactionType', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
              <input
                type="text"
                name="category"
                value={displayData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Банк отправителя</label>
              <input
                type="text"
                name="bankSender"
                value={displayData.bankSender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Банк получателя</label>
              <input
                type="text"
                name="bankReceiver"
                value={displayData.bankReceiver}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ИНН получателя</label>
              <input
                type="text"
                name="innReceiver"
                value={displayData.innReceiver}
                onChange={handleChange}
                maxLength={12}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Счет получателя</label>
              <input
                type="text"
                name="accountReceiver"
                value={displayData.accountReceiver}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Создать транзакцию
              </button>
            </div>
          </div>
        </div>

        <ApiErrorViewer error={error} />
      </form>
    </div>
  );
};

export default TransactionForm; 
import React, { useState } from 'react';
import { TransactionFilterDto, TransactionFilterDtoStatusEnum, TransactionFilterDtoTransactionTypeEnum } from '../api/generated/src/models';
import FancySelect from './FancySelect';
import Switch from './Switch';
import { TRANSACTION_TYPE_OPTIONS, TRANSACTION_STATUS_OPTIONS } from '../constants/transaction';
import { formatDate, formatAmount } from '../utils/formatters';

interface FilterFormProps {
  onFilter: (filter: TransactionFilterDto) => void;
  onReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter, onReset }) => {
  const [filter, setFilter] = useState<TransactionFilterDto>({
    dateFrom: undefined,
    dateTo: undefined,
    amountFrom: undefined,
    amountTo: undefined,
    transactionType: undefined,
    status: undefined,
    anyFilterSet: false
  });

  const [displayData, setDisplayData] = useState({
    dateFrom: '',
    dateTo: '',
    amountFrom: '',
    amountTo: '',
    transactionType: TRANSACTION_TYPE_OPTIONS[0],
    status: { id: 0, name: 'Все статусы', value: '' }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      ...filter,
      anyFilterSet: true
    });
  };

  const handleReset = () => {
    setFilter({
      dateFrom: undefined,
      dateTo: undefined,
      amountFrom: undefined,
      amountTo: undefined,
      transactionType: undefined,
      status: undefined,
      anyFilterSet: false
    });
    setDisplayData({
      dateFrom: '',
      dateTo: '',
      amountFrom: '',
      amountTo: '',
      transactionType: TRANSACTION_TYPE_OPTIONS[0],
      status: { id: 0, name: 'Все статусы', value: '' }
    });
    onReset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    let rawValue = value;

    if (name === 'amountFrom' || name === 'amountTo') {
      // Удаляем все символы кроме цифр
      rawValue = value.replace(/\D/g, '');
      
      // Форматируем для отображения
      formattedValue = formatAmount(rawValue);
      
      // Сохраняем числовое значение (делим на 100 для учета копеек)
      setFilter(prev => ({ 
        ...prev, 
        [name]: rawValue ? parseFloat(rawValue) / 100 : undefined 
      }));
    } else if (name === 'dateFrom' || name === 'dateTo') {
      rawValue = value.replace(/\D/g, '');
      formattedValue = formatDate(rawValue);
      setFilter(prev => ({ ...prev, [name]: rawValue ? new Date(rawValue) : undefined }));
    }

    setDisplayData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSelectChange = (name: string, value: { id: number; name: string; value: string } | string) => {
    if (typeof value === 'string') {
      setFilter(prev => ({ ...prev, [name]: value }));
      if (name === 'transactionType') {
        const option = TRANSACTION_TYPE_OPTIONS.find(opt => opt.value === value);
        if (option) {
          setDisplayData(prev => ({ ...prev, [name]: option }));
        }
      }
    } else {
      setFilter(prev => ({ ...prev, [name]: value.value || undefined }));
      setDisplayData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Тип транзакции</label>
          <Switch
            leftLabel="Доход"
            rightLabel="Расход"
            leftValue="INCOME"
            rightValue="EXPENSE"
            value={filter.transactionType || ''}
            onChange={(value) => handleSelectChange('transactionType', value)}
          />
        </div>

        <div>
          <FancySelect
            label="Статус"
            options={[{ id: 0, name: 'Все статусы', value: '' }, ...TRANSACTION_STATUS_OPTIONS]}
            value={displayData.status}
            onChange={(value) => handleSelectChange('status', value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Сумма от</label>
            <input
              type="text"
              name="amountFrom"
              value={displayData.amountFrom}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Сумма до</label>
            <input
              type="text"
              name="amountTo"
              value={displayData.amountTo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Дата от</label>
            <input
              type="text"
              name="dateFrom"
              value={displayData.dateFrom}
              onChange={handleChange}
              placeholder="DD.MM.YYYY"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Дата до</label>
            <input
              type="text"
              name="dateTo"
              value={displayData.dateTo}
              onChange={handleChange}
              placeholder="DD.MM.YYYY"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Сбросить
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Применить
        </button>
      </div>
    </form>
  );
};

export default FilterForm; 
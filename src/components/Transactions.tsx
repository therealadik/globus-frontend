import React, { useState } from 'react';
import { TransactionControllerApi, NewTransactionRequestDto } from '../api/generated/src';
import Switch from './Switch';
import NavBar from './NavBar';

const Transactions: React.FC = () => {
  const [username] = useState(localStorage.getItem('username') || '');
  const [formData, setFormData] = useState<NewTransactionRequestDto>({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const api = new TransactionControllerApi();
      const response = await api.create({ newTransactionRequestDto: formData });
      // Handle success (e.g., show notification, clear form)
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
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Error creating transaction:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: NewTransactionRequestDto) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, value: string) => {
    setFormData((prev: NewTransactionRequestDto) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar username={username} onLogout={handleLogout} />
      
      <div className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Создать транзакцию</h2>
            
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сумма</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Банк отправителя</label>
                  <input
                    type="text"
                    name="bankSender"
                    value={formData.bankSender}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Банк получателя</label>
                  <input
                    type="text"
                    name="bankReceiver"
                    value={formData.bankReceiver}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ИНН получателя</label>
                  <input
                    type="text"
                    name="innReceiver"
                    value={formData.innReceiver}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Счет получателя</label>
                  <input
                    type="text"
                    name="accountReceiver"
                    value={formData.accountReceiver}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white text-gray-900 h-10 px-4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон получателя</label>
                  <input
                    type="text"
                    name="phoneReceiver"
                    value={formData.phoneReceiver}
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
                  Создать транзакцию
                </button>
              </div>
            </form>
          </div>

          {/* Placeholder for transactions list */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">История транзакций</h2>
            <div className="text-gray-500 text-center py-4">
              Здесь будет отображаться история транзакций
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions; 
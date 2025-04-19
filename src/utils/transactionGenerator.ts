import { Transaction } from '../types/transaction';

const BANKS = ['Tinkoff', 'Sberbank', 'Alfabank', 'Raifeissen Bank', 'MTS Bank'];

export const generateTransaction = (): Transaction => {
  const amount = Math.floor(Math.random() * (1000000 - 50) / 100) * 100 + 50;
  const bankSender = BANKS[Math.floor(Math.random() * BANKS.length)];
  const bankReceiver = BANKS[Math.floor(Math.random() * BANKS.length)];
  const innReceiver = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  const accountReceiver = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
  const category = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');
  const phoneReceiver = '88005553535';
  const personType = Math.random() > 0.5 ? 'PHYSICAL' : 'LEGAL';
  const transactionType = Math.random() > 0.5 ? 'INCOME' : 'EXPENSE';
  const id = Math.random().toString(36).substring(2, 15);
  const createdAt = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString();

  return {
    id,
    personType,
    transactionType,
    amount,
    bankSender,
    bankReceiver,
    innReceiver,
    accountReceiver,
    category,
    phoneReceiver,
    createdAt
  };
};

export const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, () => generateTransaction());
}; 
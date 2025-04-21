import { Bank, Category } from '../types/common';
import {Transaction, TransactionStatus, TransactionType, PersonType} from "../types/transaction.ts";

export const generateBanks = (): Bank[] => [
  { id: 1, name: 'Сбербанк' },
  { id: 2, name: 'ВТБ' },
  { id: 3, name: 'Газпромбанк' },
  { id: 4, name: 'Альфа-Банк' },
  { id: 5, name: 'Райффайзенбанк' },
  { id: 6, name: 'Тинькофф Банк' },
  { id: 7, name: 'Открытие' },
  { id: 8, name: 'Россельхозбанк' },
  { id: 9, name: 'Совкомбанк' },
  { id: 10, name: 'Промсвязьбанк' },
  { id: 11, name: 'МКБ' },
  { id: 12, name: 'Росбанк' },
  { id: 13, name: 'Уралсиб' },
  { id: 14, name: 'Ак Барс' },
  { id: 15, name: 'Банк Санкт-Петербург' }
];

export const generateCategories = (): Category[] => [
  { id: 1, name: 'Зарплата' },
  { id: 2, name: 'Инвестиции' },
  { id: 3, name: 'Подарки' },
  { id: 4, name: 'Продукты' },
  { id: 5, name: 'Транспорт' },
  { id: 6, name: 'Жилье' },
  { id: 7, name: 'Коммунальные услуги' },
  { id: 8, name: 'Здоровье' },
  { id: 9, name: 'Образование' },
  { id: 10, name: 'Развлечения' },
  { id: 11, name: 'Одежда' },
  { id: 12, name: 'Техника' },
  { id: 13, name: 'Путешествия' },
  { id: 14, name: 'Спорт' },
  { id: 15, name: 'Красота' }
];

export const generateTransaction = (banks: Bank[], categories: Category[]): Transaction => {
  const amount = Math.floor(Math.random() * 100 + 1) * 1000;
  const bankSender = banks[Math.floor(Math.random() * banks.length)];
  const bankReceiver = banks[Math.floor(Math.random() * banks.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  return {
    id: Math.floor(Math.random() * 1000000),
    transactionDate: "01.01.2025",
    personType: Math.random() > 0.5 ? 'PHYSICAL' as PersonType : 'LEGAL' as PersonType,
    transactionType: Math.random() > 0.5 ? 'INCOME' as TransactionType : 'EXPENSE' as TransactionType,
    amount,
    status: 'NEW' as TransactionStatus,
    bankSenderId: bankSender.id,
    bankReceiverId: bankReceiver.id,
    innReceiver: Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)).join(''),
    accountReceiver: Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join(''),
    accountSender: Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join(''),
    categoryId: category.id,
    phoneReceiver: '+78005553535'
  };
};

export const generateTransactions = (count: number, banks: Bank[], categories: Category[]): Transaction[] => {
  return Array.from({ length: count }, () => generateTransaction(banks, categories));
}; 
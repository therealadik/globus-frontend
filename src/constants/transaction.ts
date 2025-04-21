import { PersonType, TransactionStatus, TransactionType } from '../types/transaction';

export const PERSON_TYPE_OPTIONS = [
  { id: 1, name: 'Физическое лицо', value: 'PHYSICAL' as PersonType },
  { id: 2, name: 'Юридическое лицо', value: 'LEGAL' as PersonType }
];

export const TRANSACTION_TYPE_OPTIONS = [
  { id: 1, name: 'Доход', value: 'INCOME' as TransactionType },
  { id: 2, name: 'Расход', value: 'EXPENSE' as TransactionType }
];

export const TRANSACTION_STATUS_OPTIONS = [
  { id: 1, name: 'Новая', value: 'NEW' as TransactionStatus },
  { id: 2, name: 'Подтвержденная', value: 'CONFIRMED' as TransactionStatus },
  { id: 3, name: 'В обработке', value: 'PROCESSING' as TransactionStatus },
  { id: 4, name: 'Отменена', value: 'CANCELED' as TransactionStatus },
  { id: 5, name: 'Завершена', value: 'COMPLETED' as TransactionStatus },
  { id: 6, name: 'Удалена', value: 'DELETED' as TransactionStatus },
  { id: 7, name: 'Возвращена', value: 'RETURNED' as TransactionStatus }
]; 
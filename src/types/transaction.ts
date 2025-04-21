import { PERSON_TYPE_OPTIONS } from "../constants/transaction";

import { TRANSACTION_STATUS_OPTIONS } from "../constants/transaction";

import { TRANSACTION_TYPE_OPTIONS } from "../constants/transaction";

export type PersonType = 'PHYSICAL' | 'LEGAL';
export type TransactionType = 'INCOME' | 'EXPENSE';
export type TransactionStatus = 'NEW' | 'CONFIRMED' | 'PROCESSING' | 'CANCELED' | 'COMPLETED' | 'DELETED' | 'RETURNED';

export interface Transaction {
  id: number;
  transactionDate: string;
  personType: PersonType;
  transactionType: TransactionType;
  amount: number;
  status: TransactionStatus;
  bankSenderId: number;
  bankReceiverId: number;
  innReceiver: string;
  accountReceiver: string;
  accountSender: string;
  categoryId: number;
  phoneReceiver: string;
}

export interface NewTransactionRequest {
  personType: PersonType;
  transactionType: TransactionType;
  transactionDate: string;
  status: TransactionStatus;
  amount: number;
  bankSenderId: number;
  bankReceiverId: number;
  innReceiver: string;
  accountReceiver: string;
  accountSender: string;
  categoryId: number;
  phoneReceiver: string;
}

export interface UpdateTransactionRequest extends NewTransactionRequest {
  id: number;
}

export interface TransactionCardProps {
  transaction: Transaction;
} 

export function createTransaction(): Transaction {
  return {
    id: 0,
    personType: 'PHYSICAL',
    transactionType: 'INCOME',
    transactionDate: new Date().toISOString(),
    amount: 0,
    status: 'NEW',
    bankSenderId: 0,
    bankReceiverId: 0,
    innReceiver: '',
    accountReceiver: '',
    accountSender: '',
    categoryId: 0,
    phoneReceiver: ''
  };
}
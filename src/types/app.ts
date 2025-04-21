import { Transaction } from './transaction';
import { Bank, Category } from './common';

export interface AppState {
  auth: {
    token: string | null;
    username: string | null;
  };
  transactions: {
    items: Transaction[];
    isLoading: boolean;
    error: string | null;
  };
  metrics: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  banks: Bank[];
  categories: Category[];
} 
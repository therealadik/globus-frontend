import { Transaction } from './transaction';

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
} 
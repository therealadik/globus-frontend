import { Bank, Category } from './common';
import { TransactionFilterResponseDto } from '../api/generated/src/models';

export interface AppState {
  auth: {
    token: string | null;
    username: string | null;
  };
  metrics: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  dashboard: {
    data: TransactionFilterResponseDto | null;
    isLoading: boolean;
    error: string | null;
  };
  banks: Bank[];
  categories: Category[];
} 
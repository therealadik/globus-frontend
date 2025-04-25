import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { AppState } from '../types/app';
import { Bank as AppBank, Category as AppCategory } from '../types/common';
import { banksService } from '../api/services/banksService';
import { categoriesService } from '../api/services/categoriesService';
import { transactionsService } from '../api/services/transactionsService';
import { Bank as ApiBank, Category as ApiCategory, TransactionResponseDto } from '../api/generated/src/models';
import { Transaction } from '../types/transaction';
import { displayApiError } from '../utils/errorHandler';
import { useToast } from './ToastContext';

interface AppStateContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

const convertApiBankToAppBank = (bank: ApiBank): AppBank => ({
  id: bank.id || 0,
  name: bank.name || ''
});

const convertApiCategoryToAppCategory = (category: ApiCategory): AppCategory => ({
  id: category.id || 0,
  name: category.name || ''
});

const convertToTransaction = (dto: TransactionResponseDto): Transaction => {
  if (!dto.id) {
    throw new Error('Transaction ID is required');
  }
  return {
    id: dto.id,
    transactionDate: dto.transactionDate?.toISOString() || new Date().toISOString(),
    personType: dto.personType || 'PHYSICAL',
    transactionType: dto.transactionType || 'INCOME',
    amount: dto.amount || 0,
    status: dto.status || 'NEW',
    bankSenderId: dto.bankSenderId || 0,
    bankReceiverId: dto.bankReceiverId || 0,
    innReceiver: dto.innReceiver || '',
    accountReceiver: dto.accountReceiver || '',
    accountSender: dto.accountSender || '',
    categoryId: dto.categoryId || 0,
    phoneReceiver: dto.phoneReceiver || ''
  };
};

const calculateMetrics = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.transactionType === 'INCOME') {
        acc.totalIncome += transaction.amount;
      } else {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, balance: 0 }
  );
};

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const { showError } = useToast();
  const [appState, setAppState] = useState<AppState>({
    banks: [],
    categories: [],
    metrics: {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    },
    dashboard: {
      data: null,
      isLoading: false,
      error: null
    },
    auth: {
      token: localStorage.getItem('authToken'),
      username: localStorage.getItem('username')
    }
  });

  const loadBanks = useCallback(async () => {
    try {
      const banks = await banksService.getAll();
      setAppState(prev => ({ 
        ...prev, 
        banks: banks.map(convertApiBankToAppBank)
      }));
    } catch (error) {
      await displayApiError(error, showError);
    }
  }, [showError]);

  const loadCategories = useCallback(async () => {
    try {
      const categories = await categoriesService.getAll();
      setAppState(prev => ({ 
        ...prev, 
        categories: categories.map(convertApiCategoryToAppCategory)
      }));
    } catch (error) {
      await displayApiError(error, showError);
    }
  }, [showError]);

  const loadDashboardData = useCallback(async () => {
    setAppState(prev => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        isLoading: true,
        error: null
      }
    }));

    try {
      const response = await transactionsService.findTransactionsByFilter({});
      
      // Calculate metrics from transactions
      const allTransactions = [
        ...(response.debitCreditTransactions?.debitTransactions || []),
        ...(response.debitCreditTransactions?.creditTransactions || [])
      ]
        .map(convertToTransaction)
        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

      const metrics = calculateMetrics(allTransactions);
      metrics.balance = metrics.totalIncome - metrics.totalExpenses;

      setAppState(prev => ({
        ...prev,
        metrics,
        dashboard: {
          data: response,
          isLoading: false,
          error: null
        }
      }));
    } catch (error) {
      await displayApiError(error, showError);
      setAppState(prev => ({
        ...prev,
        dashboard: {
          ...prev.dashboard,
          isLoading: false,
          error: 'Failed to load dashboard data'
        }
      }));
    }
  }, [showError]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([loadBanks(), loadCategories(), loadDashboardData()]);
      } catch (error) {
        await displayApiError(error, showError);
      }
    };

    loadInitialData();
  }, [loadBanks, loadCategories, loadDashboardData, showError]);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
}; 
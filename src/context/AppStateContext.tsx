import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState } from '../types/app';
import { Bank as AppBank, Category as AppCategory } from '../types/common';
import { generateBanks, generateTransactions } from '../utils/mockDataGenerator';
import { banksService } from '../api/services/banksService';
import { categoriesService } from '../api/services/categoriesService';
import { Bank as ApiBank, Category as ApiCategory } from '../api/generated/src/models';

interface AppStateContextType {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>({
    auth: {
      token: localStorage.getItem('authToken'),
      username: localStorage.getItem('username')
    },
    transactions: {
      items: [],
      isLoading: false,
      error: null
    },
    metrics: {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    },
    banks: [],
    categories: []
  });

  useEffect(() => {
    const mapApiBankToAppBank = (apiBank: ApiBank): AppBank => ({
      id: apiBank.id || 0, // Provide a default value if id is undefined
      name: apiBank.name || ''
    });

    const mapApiCategoryToAppCategory = (apiCategory: ApiCategory): AppCategory => ({
      id: apiCategory.id || 0, // Provide a default value if id is undefined
      name: apiCategory.name || ''
    });

    const fetchInitialData = async () => {
      try {
        const [apiBanks, apiCategories] = await Promise.all([
          banksService.getAll(),
          categoriesService.getAll()
        ]);

        const banks = apiBanks.map(mapApiBankToAppBank);
        const categories = apiCategories.map(mapApiCategoryToAppCategory);
        const transactions = generateTransactions(20, banks, categories);

        setAppState(prev => ({
          ...prev,
          banks,
          categories,
          transactions: {
            ...prev.transactions,
            items: transactions
          },
          metrics: {
            totalIncome: transactions.reduce((sum, t) => t.transactionType === 'INCOME' ? sum + t.amount : sum, 0),
            totalExpenses: transactions.reduce((sum, t) => t.transactionType === 'EXPENSE' ? sum + t.amount : sum, 0),
            balance: 0
          }
        }));
      } catch (error) {
      }
    };

    fetchInitialData();
  }, []);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
}; 
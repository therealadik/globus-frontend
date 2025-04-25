import React, { useState, useEffect } from 'react';
import TransactionCard from '../components/TransactionCard';
import TransactionModal from '../components/TransactionModal';
import FilterForm from '../components/FilterForm';
import { transactionsService } from '../api/services/transactionsService';
import { Transaction } from '../types/transaction';
import { useAppState } from '../context/AppStateContext';
import { TransactionFilterDto, TransactionResponseDto } from '../api/generated/src/models';
import { useToast } from '../context/ToastContext';
import { displayApiError } from '../utils/errorHandler';
import { localToUtc } from '../utils/timezone';

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

const TransactionsPage: React.FC = () => {
  const { appState, setAppState } = useAppState();
  const { showError } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const loadTransactions = async (filter?: TransactionFilterDto) => {
    try {
      const response = await transactionsService.findTransactionsByFilter(filter || {});
      
      // Combine debit and credit transactions and sort by date
      const allTransactions = [
        ...(response.debitCreditTransactions?.debitTransactions || []),
        ...(response.debitCreditTransactions?.creditTransactions || [])
      ]
        .map(convertToTransaction)
        .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());

      setAppState(prev => {
        const metrics = calculateMetrics(allTransactions);
        metrics.balance = metrics.totalIncome - metrics.totalExpenses;
        return {
          ...prev,
          metrics,
          dashboard: {
            data: response,
            isLoading: false,
            error: null
          }
        };
      });
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
  };

  const handleTransactionSubmit = async (data: Omit<Transaction, 'id'>) => {
    try {
      if (editingTransaction) {
        // Update existing transaction
        const updatedTransaction = {
          ...editingTransaction,
          ...data
        };

        // Convert local date to UTC before sending to server
        const utcDate = localToUtc(new Date(data.transactionDate));

        // Send to server
        await transactionsService.update(updatedTransaction.id, {
          ...data,
          transactionDate: utcDate
        });

        // Reload transactions after update
        await loadTransactions();
        setEditingTransaction(null);
      } else {
        // Convert local date to UTC before sending to server
        const utcDate = localToUtc(new Date(data.transactionDate));

        // Send to server
        await transactionsService.create({
          ...data,
          transactionDate: utcDate
        });

        // Reload transactions after create
        await loadTransactions();
      }

      // Close modal after successful submission
      setIsModalOpen(false);
    } catch (error) {
      await displayApiError(error, showError);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleFilter = async (filter: TransactionFilterDto) => {
    await loadTransactions(filter);
  };

  const handleResetFilter = async () => {
    await loadTransactions();
  };

  const handleDeleteTransaction = async () => {
    await loadTransactions();
  };

  // Get transactions from dashboard data
  const transactions = appState.dashboard.data ? [
    ...(appState.dashboard.data.debitCreditTransactions?.debitTransactions || []),
    ...(appState.dashboard.data.debitCreditTransactions?.creditTransactions || [])
  ]
    .map(convertToTransaction)
    .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()) : [];

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* Transactions List - Takes 8 columns */}
        <div className="col-span-8 bg-white shadow rounded-lg p-6 h-[720px] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">История транзакций</h2>
            <button
              onClick={() => {
                setEditingTransaction(null);
                setIsModalOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Создать транзакцию
            </button>
          </div>

          {/* Transactions List */}
          <div className="flex-1 overflow-y-auto">
            {appState.dashboard.isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map(transaction => (
                  <TransactionCard 
                    key={transaction.id} 
                    transaction={transaction}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Form - Takes 4 columns */}
        <div className="col-span-4 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Фильтры</h2>
          <FilterForm onFilter={handleFilter} onReset={handleResetFilter} />
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSubmit={handleTransactionSubmit}
        initialData={editingTransaction}
      />
    </>
  );
};

export default TransactionsPage; 
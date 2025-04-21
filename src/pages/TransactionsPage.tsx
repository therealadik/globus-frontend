import React, { useState } from 'react';
import BalanceOverview from '../components/BalanceOverview';
import TransactionForm from '../components/TransactionForm';
import TransactionCard from '../components/TransactionCard';
import TransactionModal from '../components/TransactionModal';
import { transactionsService } from '../api/services/transactionsService';
import { Transaction } from '../types/transaction';
import { useAppState } from '../context/AppStateContext';

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

const TransactionsPage: React.FC = () => {
  const { appState, setAppState } = useAppState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleTransactionSubmit = async (data: Omit<Transaction, 'id'>) => {
    try {
      if (editingTransaction) {
        // Update existing transaction
        const updatedTransaction = {
          ...editingTransaction,
          ...data
        };

        // Send to server
        await transactionsService.update(updatedTransaction.id, {
          ...data,
          transactionDate: new Date(data.transactionDate)
        });

        // Update state with updated transaction
        setAppState(prev => {
          const newTransactions = prev.transactions.items.map(t => 
            t.id === editingTransaction.id ? updatedTransaction : t
          );
          const metrics = calculateMetrics(newTransactions);
          metrics.balance = metrics.totalIncome - metrics.totalExpenses;

          return {
            ...prev,
            transactions: {
              ...prev.transactions,
              items: newTransactions
            },
            metrics
          };
        });

        setEditingTransaction(null);
      } else {
        // Create new transaction
        const newTransaction: Transaction = {
          ...data,
          id: Math.floor(Math.random() * 1000000),
        };

        // Send to server
        await transactionsService.create({
          ...data,
          transactionDate: new Date(data.transactionDate)
        });

        // Update state with new transaction
        setAppState(prev => {
          const newTransactions = [newTransaction, ...prev.transactions.items];
          const metrics = calculateMetrics(newTransactions);
          metrics.balance = metrics.totalIncome - metrics.totalExpenses;

          return {
            ...prev,
            transactions: {
              ...prev.transactions,
              items: newTransactions
            },
            metrics
          };
        });
      }

      // Close modal after successful submission
      setIsModalOpen(false);
    } catch (error) {
      throw error; // Re-throw to be caught by form
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <BalanceOverview />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Transactions List */}
        <div className="bg-white shadow rounded-lg p-6 h-[720px] overflow-y-auto">
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
          <div className="space-y-4">
            {appState.transactions.items.map(transaction => (
              <TransactionCard 
                key={transaction.id} 
                transaction={transaction}
                onEdit={handleEditTransaction}
              />
            ))}
          </div>
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
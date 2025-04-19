export interface Transaction {
  id: string;
  personType: 'PHYSICAL' | 'LEGAL';
  transactionType: 'INCOME' | 'EXPENSE';
  amount: number;
  bankSender: string;
  bankReceiver: string;
  innReceiver: string;
  accountReceiver: string;
  category: string;
  phoneReceiver: string;
  createdAt: string;
}

export interface TransactionCardProps {
  transaction: Transaction;
} 
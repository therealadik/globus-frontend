import { Configuration } from '../generated/src';
import { TransactionControllerApi } from '../generated/src/apis';
import { 
  NewTransactionRequestDto, 
  TransactionResponseDto,
  TransactionFilterDto,
  TransactionFilterResponseDto
} from '../generated/src/models';
import { displayApiError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const config = new Configuration({
  basePath: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

const apiClient = new TransactionControllerApi(config);

export const transactionsService = {
  create: async (transaction: NewTransactionRequestDto): Promise<TransactionResponseDto> => {
    try {
      return await apiClient.create({ newTransactionRequestDto: transaction });
    } catch (error: any) {
      await displayApiError(error);
      throw error;
    }
  },
  update: async (id: number, transaction: NewTransactionRequestDto): Promise<TransactionResponseDto> => {
    try {
      return await apiClient.updateTransaction({ 
        updateTransactionRequestDto: {
          ...transaction,
          id
        }
      });
    } catch (error: any) {
      await displayApiError(error);
      throw error;
    }
  },
  delete: async (id: number): Promise<void> => {
    try {
      await apiClient.deleteTransaction({ id });
    } catch (error: any) {
      await displayApiError(error);
      throw error;
    }
  },
  findTransactionsByFilter: async (filter: TransactionFilterDto): Promise<TransactionFilterResponseDto> => {
    try {
      return await apiClient.findTransactionsByFilter({ transactionFilterDto: filter });
    } catch (error: any) {
      await displayApiError(error);
      throw error;
    }
  },
  getPdfReport: async (): Promise<string> => {
    try {
      return await apiClient.getPdfReport();
    } catch (error: any) {
      await displayApiError(error);
      throw error;
    }
  }
}; 
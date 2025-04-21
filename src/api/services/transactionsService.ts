import { Configuration } from '../generated/src';
import { TransactionControllerApi } from '../generated/src/apis';
import { NewTransactionRequestDto, TransactionResponseDto } from '../generated/src/models';
import { handleApiError } from '../../utils/errorHandler';

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
      const apiError = await handleApiError(error);
      throw apiError;
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
      const apiError = await handleApiError(error);
      throw apiError;
    }
  }
}; 
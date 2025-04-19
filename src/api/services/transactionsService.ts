import { Configuration } from '../generated/src/runtime';
import { TransactionControllerApi } from '../generated/src/apis';
import { NewTransactionRequestDto } from '../generated/src/models';
import { handleApiError } from '../../utils/errorHandler';
import { ApiError } from '../../types/api';

const config = new Configuration({
  basePath: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

const apiClient = new TransactionControllerApi(config);

export const transactionsService = {
  create: async (transaction: NewTransactionRequestDto): Promise<void> => {
    try {
      await apiClient.create({ newTransactionRequestDto: transaction });
    } catch (error) {
      const apiError = await handleApiError(error);
      throw apiError;
    }
  }
}; 
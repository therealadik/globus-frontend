import { Configuration } from '../generated/src';
import { BankControllerApi } from '../generated/src/apis';
import { Bank } from '../generated/src/models';
import { handleApiError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const config = new Configuration({
  basePath: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

const apiClient = new BankControllerApi(config);

export const banksService = {
  getAll: async (): Promise<Bank[]> => {
    try {
      const response = await apiClient.getAllBanks();
      return response;
    } catch (error) {
      const apiError = await handleApiError(error);
      throw apiError;
    }
  },
}; 
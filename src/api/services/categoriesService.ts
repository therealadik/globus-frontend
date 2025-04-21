import { Configuration } from '../generated/src';
import { CategoryControllerApi } from '../generated/src/apis';
import { Category } from '../generated/src/models';
import { handleApiError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const config = new Configuration({
  basePath: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  }
});

const apiClient = new CategoryControllerApi(config);

export const categoriesService = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.getAllCategories();
      return response;
    } catch (error) {
      const apiError = await handleApiError(error);
      throw apiError;
    }
  },
}; 
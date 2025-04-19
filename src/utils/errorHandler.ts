import { ErrorResponse } from '../api/generated/src/models';
import { ApiError } from '../types/api';

export const handleApiError = async (error: any): Promise<ApiError> => {
  if (error.response) {
    try {
      const errorData: ErrorResponse = await error.response.json();
      const apiError: ApiError = {
        message: errorData.message || `Ошибка ${error.response.status}`,
        details: errorData.details?.map(detail => ({
          field: detail.field,
          message: detail.message || ''
        }))
      };
      return apiError;
    } catch (e) {
      return {
        message: `Ошибка ${error.response.status}`
      };
    }
  }
  return {
    message: 'Произошла ошибка при выполнении запроса'
  };
}; 
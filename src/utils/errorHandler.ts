import { ErrorResponse } from '../api/generated/src/models';
import { ApiError } from '../types/api';

export const handleApiError = async (error: any): Promise<ApiError> => {
  if (error.response) {
    try {
      // Clone the response before reading it
      const response = error.response.clone();
      const errorData: ErrorResponse = await response.json();
      console.log('Error data from server:', errorData);
      
      return {
        message: errorData.message || `Ошибка ${error.response.status}`,
        details: errorData.details?.map(detail => ({
          field: detail.field || '',
          message: detail.message || ''
        }))
      };
    } catch (e) {
      console.error('Error parsing error response:', e);
      return {
        message: `Ошибка ${error.response.status}`
      };
    }
  }
  return {
    message: 'Произошла ошибка при выполнении запроса'
  };
}; 
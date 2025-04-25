import { ErrorResponse } from '../api/generated/src/models';
import { ApiError } from '../types/api';

export const displayApiError = async (error: any, onError?: (error: ApiError) => void): Promise<void> => {
  let apiError: ApiError;

  if (error.response) {
    try {
      const response = error.response.clone();
      const errorData: ErrorResponse = await response.json();
      
      apiError = {
        message: errorData.message || `Ошибка ${error.response.status}`,
        details: errorData.details ? errorData.details.map(detail => ({
          field: detail.field || '',
          message: detail.message || ''
        })) : undefined
      };
    } catch (e) {
      apiError = {
        message: `Ошибка ${error.response.status}`
      };
    }
  } else if (error.message) {
    // Handle error object with message property
    apiError = {
      message: error.message,
      details: error.details
    };
  } else {
    console.log("API error", error);
    apiError = {
      message: 'Произошла ошибка при выполнении запроса'
    };
  }

  // Call the error callback if provided
  if (onError) {
    onError(apiError);
  }
}; 
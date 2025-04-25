/// <reference types="vite/client" />

import { Configuration } from '../generated/src';
import { AuthenticationControllerApi } from '../generated/src/apis';
import { LoginRequestDto, RegistrationRequestDto, AuthenticationResponseDto } from '../generated/src/models';
import { displayApiError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const config = new Configuration({
  basePath: API_BASE_URL
});

const apiClient = new AuthenticationControllerApi(config);

export const authService = {
  login: async (username: string, password: string): Promise<AuthenticationResponseDto> => {
    try {
      const request: LoginRequestDto = {
        username,
        password
      };
      const response = await apiClient.login({ loginRequestDto: request });
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      await displayApiError(error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  register: async (username: string, password: string): Promise<AuthenticationResponseDto> => {
    try {
      const request: RegistrationRequestDto = {
        username,
        password
      };
      const response = await apiClient.register({ registrationRequestDto: request });
      return response;
    } catch (error) {
      await displayApiError(error);
      throw error;
    }
  }
}; 
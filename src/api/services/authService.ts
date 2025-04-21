/// <reference types="vite/client" />

import { AuthenticationControllerApi } from '../generated/src/apis';
import { createAuthConfig } from '../config';
import { LoginRequestDto, RegistrationRequestDto, AuthenticationResponseDto } from '../generated/src/models';
import { handleApiError } from '../../utils/errorHandler';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const authApi = new AuthenticationControllerApi(createAuthConfig(API_BASE_URL));

export const authService = {
  login: async (username: string, password: string): Promise<AuthenticationResponseDto> => {
    try {
      const loginDto: LoginRequestDto = { username, password };
      const response = await authApi.login({ loginRequestDto: loginDto });
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      return response;
    } catch (error) {
      const apiError = await handleApiError(error);
      throw apiError;
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
      const registerDto: RegistrationRequestDto = { username, password };
      const response = await authApi.register({ registrationRequestDto: registerDto });
      return response;
    } catch (error) {
      const apiError = await handleApiError(error);
      throw apiError;
    }
  }
}; 
import { Configuration } from '../generated/src/runtime';
import { AuthenticationControllerApi } from '../generated/src/apis';
import { LoginRequestDto, RegistrationRequestDto, ErrorResponse } from '../generated/src/models';

const config = new Configuration({
  basePath: 'http://localhost:8080',
});

const apiClient = new AuthenticationControllerApi(config);

const handleApiError = async (error: any): Promise<never> => {
  if (error.response) {
    const errorData = await error.response.json();
    throw new Error(JSON.stringify(errorData));
  }
  throw error;
};

export const authService = {
  login: async (username: string, password: string) => {
    try {
      const loginDto: LoginRequestDto = { username, password };
      const response = await apiClient.login({ loginRequestDto: loginDto });
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },

  register: async (username: string, password: string) => {
    try {
      const registerDto: RegistrationRequestDto = { username, password };
      const response = await apiClient.register({ registrationRequestDto: registerDto });
      return response;
    } catch (error) {
      return handleApiError(error);
    }
  },
}; 
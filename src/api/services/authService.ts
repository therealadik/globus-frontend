import { Configuration } from '../generated/src/runtime';
import { AuthenticationControllerApi } from '../generated/src/apis';
import { LoginRequestDto, RegistrationRequestDto } from '../generated/src/models';

const config = new Configuration({
  basePath: 'http://localhost:8080',
});

const apiClient = new AuthenticationControllerApi(config);

export const authService = {
  login: async (username: string, password: string) => {
    const loginDto: LoginRequestDto = { username, password };
    const response = await apiClient.login({ loginRequestDto: loginDto });
    return response;
  },

  register: async (username: string, password: string) => {
    const registerDto: RegistrationRequestDto = { username, password };
    const response = await apiClient.register({ registrationRequestDto: registerDto });
    return response;
  },
}; 
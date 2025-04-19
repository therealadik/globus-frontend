import { Configuration } from './generated/src';

const getAuthToken = () => {
  return localStorage.getItem('authToken') || '';
};

export const createApiConfig = (basePath: string) => {
  return new Configuration({
    basePath,
    accessToken: getAuthToken,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const createAuthConfig = (basePath: string) => {
  return new Configuration({
    basePath,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}; 
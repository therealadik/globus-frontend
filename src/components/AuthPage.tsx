import React, { useState } from 'react';
import { authService } from '../api/services/authService';
import { ErrorResponse, AuthenticationResponseDto } from '../api/generated/src/models';

interface AuthFormData {
  username: string;
  password: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setErrorDetails([]);
    setLoading(true);

    try {
      const response = isLogin 
        ? await authService.login(formData.username, formData.password)
        : await authService.register(formData.username, formData.password);

      if (response && 'token' in response) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('username', formData.username);
        window.location.href = '/';
      }
    } catch (err) {
      if (err instanceof Error) {
        try {
          const errorResponse = JSON.parse(err.message) as ErrorResponse;
          setError(errorResponse.message || 'Произошла ошибка');
          
          if (errorResponse.details && errorResponse.details.length > 0) {
            setErrorDetails(errorResponse.details.map(detail => {
              if (detail.field && detail.message) {
                return `${detail.field}: ${detail.message}`;
              }
              return detail.message || detail.field || '';
            }));
          }
        } catch (parseError) {
          setError(err.message);
        }
      } else {
        setError('Произошла неизвестная ошибка');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      {/* Wave animation background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Добро пожаловать' : 'Создать аккаунт'}
              </h2>
              <p className="text-white/80">
                {isLogin ? 'Войдите, чтобы продолжить' : 'Присоединяйтесь к нам'}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-white mb-2">
                  Имя пользователя
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Введите имя пользователя"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Пароль
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Введите пароль"
                />
              </div>

              {(error || errorDetails.length > 0) && (
                <div className="rounded-lg bg-red-500/20 p-4 border border-red-500/30">
                  {error && <div className="text-sm text-red-200 font-medium mb-2">{error}</div>}
                  {errorDetails.length > 0 && (
                    <ul className="text-sm text-red-200 space-y-1">
                      {errorDetails.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-white text-indigo-600 font-medium hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Обработка...
                  </span>
                ) : (
                  isLogin ? 'Войти' : 'Зарегистрироваться'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isLogin ? "Нет аккаунта? Зарегистрироваться" : 'Уже есть аккаунт? Войти'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 
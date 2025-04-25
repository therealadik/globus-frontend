export const formatAmount = (value: string | number) => {
  let numValue: number;
  
  if (typeof value === 'string') {
    // Для строки: удаляем все нецифровые символы и делим на 100 для учета копеек
    numValue = parseFloat(value.replace(/\D/g, '')) / 100;
  } else {
    // Для числа: округляем до 2 знаков после запятой
    numValue = Math.round(value * 100) / 100;
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numValue);
};

export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 1) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 1)} ${numbers.slice(1)}`;
  if (numbers.length <= 7) return `${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4)}`;
  return `${numbers.slice(0, 1)} ${numbers.slice(1, 4)} ${numbers.slice(4, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9)}`;
};

export const formatAccount = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 20);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 5) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
  if (numbers.length <= 8) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8)}`;
  return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8, 9)} ${numbers.slice(9)}`;
};

export const formatDate = (value: string) => {
  // Если это ISO строка, конвертируем в локальную дату
  if (value.includes('T')) {
    const date = new Date(value);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Europe/Moscow'
    });
  }

  // Если это строка в формате DD.MM.YYYY, форматируем как есть
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 8)}`;
};

export const parseDate = (value: string) => {
  try {
    const [day, month, year] = value.split('.').map(Number);
    if (!day || !month || !year || day > 31 || month > 12) {
      return new Date().toISOString();
    }
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    return date.toISOString();
  } catch (e) {
    return new Date().toISOString();
  }
}; 
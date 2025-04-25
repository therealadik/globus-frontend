/**
 * Utility functions for handling timezone conversions
 */

/**
 * Converts a UTC date string to the user's local timezone
 * @param utcDateString - ISO string in UTC
 * @returns Date object in local timezone
 */
export const utcToLocal = (utcDateString: string): Date => {
  const date = new Date(utcDateString);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

/**
 * Converts a local date to UTC
 * @param localDate - Date object in local timezone
 * @returns Date object in UTC
 */
export const localToUtc = (localDate: Date): Date => {
  return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
};

/**
 * Formats a date in the user's local timezone
 * @param date - Date object or ISO string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatLocalDate = (date: Date | string, options: Intl.DateTimeFormatOptions = {}): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...options
  });
};

/**
 * Formats a date and time in the user's local timezone
 * @param date - Date object or ISO string
 * @returns Formatted date and time string
 */
export const formatLocalDateTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleString('ru-RU', {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}; 
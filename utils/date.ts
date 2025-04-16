import { format, isValid } from 'date-fns';
import { DATE_FORMAT } from '@/config';

export const formatDate = (
  date: string | Date,
  formatDate: string = DATE_FORMAT.dateTime
): string => {
  const parseDate = typeof date === 'string' ? new Date(date) : date;

  if (!isValid(parseDate)) return '';

  return format(parseDate, formatDate);
};

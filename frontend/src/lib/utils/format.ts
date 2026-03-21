import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format date as "15 de marzo de 2026"
 */
export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
}

/**
 * Format date as "15 mar 2026"
 */
export function formatDateShort(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'd MMM yyyy', { locale: es });
}

/**
 * Format date range as "15 - 20 de marzo de 2026"
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const start = parseISO(startDate);
  if (!endDate) {
    return format(start, "d 'de' MMMM 'de' yyyy", { locale: es });
  }
  const end = parseISO(endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${format(start, 'd', { locale: es })} - ${format(end, "d 'de' MMMM 'de' yyyy", { locale: es })}`;
  }
  return `${format(start, "d 'de' MMMM", { locale: es })} - ${format(end, "d 'de' MMMM 'de' yyyy", { locale: es })}`;
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Truncate string to a max length with ellipsis
 */
export function truncate(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

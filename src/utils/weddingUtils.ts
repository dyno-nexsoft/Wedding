/**
 * Utility functions for wedding-related calculations and formatting.
 */

export interface WeddingEvent {
  title: string;
  location: string;
  address: string;
  mapLink: string;
}

/**
 * Helper to convert Vietnamese date object to JS Date
 */
export function toJSDate(date: { year: number; month: number; day: number; hour: number; minute: number }): Date {
  return new Date(date.year, date.month - 1, date.day, date.hour, date.minute);
}

/**
 * Generates a Google Calendar URL for a wedding event.
 * 
 * @param event - The event details.
 * @param coupleName - The names of the couple.
 * @param baseDate - The reference wedding date object.
 * @returns A Google Calendar template URL string.
 */
export function generateGoogleCalendarUrl(
  event: WeddingEvent,
  coupleName: string,
  baseDate: { year: number; month: number; day: number; hour: number; minute: number }
): string {
  const title = event.title;
  const location = event.location;
  const details = `Đám cưới ${coupleName}`;
  
  // Combine date with event time
  const startObj = toJSDate(baseDate);
  const endObj = new Date(startObj.getTime() + 2 * 60 * 60 * 1000); // Default 2 hours
  
  // Format to YYYYMMDDTHHMMSSZ (UTC)
  const formatUTC = (date: Date) => date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  
  const startTimeStr = formatUTC(startObj);
  const endTimeStr = formatUTC(endObj);
  
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startTimeStr}/${endTimeStr}`;
}

/**
 * Generates a calendar grid for a given date.
 * 
 * @param dateObjOrData - The Date object or wedding date object.
 * @returns An array containing nulls for padding and numbers for the days of the month.
 */
export function getCalendarGrid(dateObjOrData: any) {
  const dateObj = (dateObjOrData.year) ? toJSDate(dateObjOrData) : new Date(dateObjOrData);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const days: (number | null)[] = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  return days;
}

/**
 * Formats a date string into a Vietnamese weekday name.
 * 
 * @param date - The Date object or date object from config.
 * @returns The Vietnamese weekday string (e.g., "Thứ Bảy").
 */
export function getVietnameseWeekday(date: any): string {
  const dateObj = (date?.year) ? toJSDate(date) : (typeof date === 'string' ? new Date(date) : date);
  return new Intl.DateTimeFormat('vi-VN', { weekday: 'long' }).format(dateObj);
}

/**
 * Generates a VietQR image URL for banking.
 * 
 * @param bankId - The bank identifier.
 * @param accountNo - The account number.
 * @param accountName - The account holder name.
 * @returns A URL string for the QR image.
 */
export function getVietQRUrl(bankId: string, accountNo: string, accountName: string): string {
  const encodedName = encodeURIComponent(
    accountName.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/Đ/g, "D")
  );
  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact.png?accountName=${encodedName}`;
}

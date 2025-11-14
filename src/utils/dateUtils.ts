
/**
 * Format date as YYYY-MM-DD for API
 */
export const formatDateForAPI = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format time as HH:MM for API (without seconds)
 */
export const formatTimeForAPI = (time: Date): string => {
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`; // No seconds - just HH:MM
};

/**
 * Format date for display (e.g., "November 14, 2025")
 */
export const formatDateDisplay = (date: Date): string => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Format time for display (e.g., "02:30 PM")
 */
export const formatTimeDisplay = (time: Date | string): string => {
  if (typeof time === 'string') {
    // Parse time string "14:30:00" to Date
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }
  
  return time.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

/**
 * Get current date with time set to start of day
 */
export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Check if date is today
 */
export const isToday = (date: Date | string): boolean => {
  const today = getToday();
  const compareDate = typeof date === 'string' ? new Date(date) : date;
  compareDate.setHours(0, 0, 0, 0);
  return compareDate.getTime() === today.getTime();
};

/**
 * Generate array of dates for calendar
 */
export const generateCalendarDays = (count: number = 5): Array<{label: string, date: number, fullDate: Date}> => {
  const today = new Date();
  const daysArray = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    daysArray.push({
      label: dayNames[date.getDay()],
      date: date.getDate(),
      fullDate: date
    });
  }
  
  return daysArray;
};
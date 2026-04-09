/**
 * Calendar utility functions for date calculations and formatting.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

/**
 * Get number of days in a given month.
 * @param {number} year 
 * @param {number} month - 0-indexed (0 = January)
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of week for the first day of a month (Monday=0 start).
 * @param {number} year 
 * @param {number} month - 0-indexed
 * @returns {number} 0=Monday, 6=Sunday
 */
export function getFirstDayOfWeek(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert from Sunday=0 to Monday=0
  return day === 0 ? 6 : day - 1;
}

/**
 * Check if a date is today.
 * @param {number} year 
 * @param {number} month - 0-indexed
 * @param {number} day 
 * @returns {boolean}
 */
export function isToday(year, month, day) {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

/**
 * Check if a date is a weekend (Saturday or Sunday).
 * @param {number} year 
 * @param {number} month - 0-indexed
 * @param {number} day 
 * @returns {{ isSaturday: boolean, isSunday: boolean }}
 */
export function getWeekendStatus(year, month, day) {
  const dayOfWeek = new Date(year, month, day).getDay();
  return {
    isSaturday: dayOfWeek === 6,
    isSunday: dayOfWeek === 0,
  };
}

/**
 * Check if a date falls within a range (inclusive).
 * @param {Date} date 
 * @param {Date|null} start 
 * @param {Date|null} end 
 * @returns {string} 'start' | 'end' | 'in-range' | 'none'
 */
export function getRangeStatus(date, start, end) {
  if (!start) return 'none';

  const dateTime = date.getTime();

  if (start && dateTime === start.getTime()) return 'start';
  if (end && dateTime === end.getTime()) return 'end';
  if (start && end && dateTime > start.getTime() && dateTime < end.getTime()) {
    return 'in-range';
  }
  // When only start is picked (no end yet), still mark start
  if (start && !end && dateTime === start.getTime()) return 'start';
  return 'none';
}

/**
 * Create a Date object from year, month, day (month is 0-indexed).
 */
export function createDate(year, month, day) {
  return new Date(year, month, day);
}

/**
 * Format month and year for display.
 * @param {number} month - 0-indexed
 * @param {number} year 
 * @returns {string} e.g. "JANUARY 2026"
 */
export function formatMonthYear(month, year) {
  return `${MONTH_NAMES[month].toUpperCase()} ${year}`;
}

/**
 * Get month name.
 * @param {number} month - 0-indexed
 * @returns {string}
 */
export function getMonthName(month) {
  return MONTH_NAMES[month];
}

/**
 * Generate a localStorage key for notes.
 * If a range is selected, it uses the range dates in the key.
 * @param {number} year 
 * @param {number} month - 0-indexed
 * @param {Date|null} rangeStart
 * @param {Date|null} rangeEnd
 * @returns {string} e.g. "calendar-notes-2026-04" or "calendar-notes-2026-04-05-to-10"
 */
export function getNotesKey(year, month, rangeStart = null, rangeEnd = null) {
  const m = String(month + 1).padStart(2, '0');
  const baseKey = `calendar-notes-${year}-${m}`;

  if (rangeStart && rangeEnd) {
    const d1 = String(rangeStart.getDate()).padStart(2, '0');
    const d2 = String(rangeEnd.getDate()).padStart(2, '0');
    return `${baseKey}-${d1}-to-${d2}`;
  } else if (rangeStart) {
    const d1 = String(rangeStart.getDate()).padStart(2, '0');
    return `${baseKey}-${d1}`;
  }

  return baseKey;
}

/**
 * Format a date range for display.
 * @param {Date|null} start 
 * @param {Date|null} end 
 * @returns {string}
 */
export function formatDateRange(start, end) {
  if (!start) return '';
  const opts = { month: 'short', day: 'numeric' };
  const startStr = start.toLocaleDateString('en-IN', opts);
  if (!end) return startStr;
  const endStr = end.toLocaleDateString('en-IN', opts);
  return `${startStr} — ${endStr}`;
}

/**
 * Calculate number of days in a range (inclusive).
 * @param {Date} start 
 * @param {Date} end 
 * @returns {number}
 */
export function getDaysInRange(start, end) {
  if (!start || !end) return 0;
  const diff = Math.abs(end.getTime() - start.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

export { MONTH_NAMES, WEEKDAY_LABELS };

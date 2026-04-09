/**
 * Indian public holidays for 2026.
 * Each entry: { month (0-indexed), day, name, emoji, description }
 */

const HOLIDAYS_2026 = [
  { month: 0, day: 26, name: 'Republic Day', emoji: '🇮🇳', description: 'Honors the date on which the Constitution of India came into effect.' },
  { month: 0, day: 23, name: 'Vasant Panchami', emoji: '🌼', description: 'Marks the preliminary preparations for the arrival of spring.' },
  { month: 2, day: 3, name: 'Maha Shivaratri', emoji: '🕉️', description: 'A Hindu festival celebrated annually in honour of the deity Shiva.' },
  { month: 2, day: 17, name: 'Holi', emoji: '🎨', description: 'The festival of colors, representing the arrival of spring and victory of good.' },
  { month: 2, day: 30, name: 'Eid-ul-Fitr', emoji: '🌙', description: 'Marks the end of the month-long dawn-to-sunset fasting of Ramadan.' },
  { month: 3, day: 3, name: 'Good Friday', emoji: '✝️', description: 'A Christian holiday commemorating the crucifixion of Jesus and his death.' },
  { month: 3, day: 6, name: 'Ram Navami', emoji: '🛕', description: 'Celebrates the birth of Rama, the seventh avatar of the deity Vishnu.' },
  { month: 3, day: 14, name: 'Dr. Ambedkar Jayanti', emoji: '⚖️', description: 'Marks the birthday of Dr. B. R. Ambedkar, father of the Indian Constitution.' },
  { month: 4, day: 1, name: 'May Day', emoji: '🛠️', description: 'A day intended to celebrate the achievements of workers.' },
  { month: 4, day: 12, name: 'Buddha Purnima', emoji: '☸️', description: 'Celebrates the birthday of Prince Siddhartha Gautama, the Buddha.' },
  { month: 5, day: 6, name: 'Eid-ul-Adha', emoji: '🕌', description: 'The latter of the two Islamic holidays celebrated worldwide each year.' },
  { month: 6, day: 6, name: 'Muharram', emoji: '🤲', description: 'The first month of the Islamic calendar. A solemn month of remembrance.' },
  { month: 7, day: 15, name: 'Independence Day', emoji: '🇮🇳', description: 'Commemorates the nation\'s independence from the United Kingdom.' },
  { month: 7, day: 19, name: 'Janmashtami', emoji: '🦚', description: 'Annual Hindu festival that celebrates the birth of Krishna.' },
  { month: 8, day: 5, name: 'Milad-un-Nabi', emoji: '✨', description: 'The observance of the birthday of the Islamic prophet Muhammad.' },
  { month: 9, day: 2, name: 'Gandhi Jayanti', emoji: '🕊️', description: 'Celebrated to mark the birthday of Mahatma Gandhi.' },
  { month: 9, day: 21, name: 'Dussehra', emoji: '🏹', description: 'A major Hindu festival marking the end of Navaratri.' },
  { month: 10, day: 8, name: 'Diwali', emoji: '🪔', description: 'The festival of lights, one of the most popular festivals of Hinduism.' },
  { month: 10, day: 9, name: 'Govardhan Puja', emoji: '⛰️', description: 'Hindu festival celebrating Krishna defeating Indra.' },
  { month: 10, day: 15, name: 'Guru Nanak Jayanti', emoji: '🙏', description: 'Celebrates the birth of the first Sikh guru, Guru Nanak.' },
  { month: 11, day: 25, name: 'Christmas', emoji: '🎄', description: 'An annual festival commemorating the birth of Jesus Christ.' },
];

/**
 * Get holidays for a specific month and year.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {Array<{day: number, name: string, emoji: string, description: string}>}
 */
export function getHolidaysForMonth(year, month) {
  if (year === 2026) {
    return HOLIDAYS_2026.filter(h => h.month === month);
  }
  const fixedHolidays = [
    { month: 0, day: 26, name: 'Republic Day', emoji: '🇮🇳', description: 'Commemorates the Constitution taking effect.' },
    { month: 7, day: 15, name: 'Independence Day', emoji: '🇮🇳', description: 'India\'s independence day.' },
    { month: 9, day: 2, name: 'Gandhi Jayanti', emoji: '🕊️', description: 'Birthday of Mahatma Gandhi.' },
    { month: 11, day: 25, name: 'Christmas', emoji: '🎄', description: 'Commemorating the birth of Jesus Christ.' },
  ];
  return fixedHolidays.filter(h => h.month === month);
}

/**
 * Check if a specific date is a holiday.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @param {number} day
 * @returns {Object|null} Holiday object {name, emoji, description} or null
 */
export function getHolidayInfo(year, month, day) {
  const holidays = getHolidaysForMonth(year, month);
  return holidays.find(h => h.day === day) || null;
}

export default HOLIDAYS_2026;

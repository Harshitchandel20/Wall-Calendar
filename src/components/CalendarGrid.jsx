import React, { useMemo, useCallback } from 'react';
import CalendarDay from './CalendarDay';
import {
  getDaysInMonth,
  getFirstDayOfWeek,
  isToday,
  getWeekendStatus,
  getRangeStatus,
  createDate,
  WEEKDAY_LABELS,
} from '../utils/calendarUtils';
import { getHolidayInfo } from '../data/holidays';

/**
 * CalendarGrid — 7-column grid (Mon–Sun) with weekday headers and date cells.
 * Supports click-to-select AND drag-to-select date ranges. Enhanced with Tailwind.
 */
export default function CalendarGrid({
  year,
  month,
  selectedRange,
  isDragging,
  hasDragged,
  accentColor,
  onDateClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  transitionDirection,
  isTransitioning,
}) {
  // Generate grid cells
  const cells = useMemo(() => {
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);
    const result = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      result.push({ day: null, key: `empty-start-${i}` });
    }

    // Actual day cells
    for (let d = 1; d <= totalDays; d++) {
      const { isSaturday, isSunday } = getWeekendStatus(year, month, d);
      const date = createDate(year, month, d);
      const rangeStatus = getRangeStatus(
        date,
        selectedRange.start,
        selectedRange.end
      );
      const holidayInfo = getHolidayInfo(year, month, d);

      result.push({
        day: d,
        key: `day-${d}`,
        isToday: isToday(year, month, d),
        isSaturday,
        isSunday,
        holidayInfo,
        rangeStatus,
      });
    }

    return result;
  }, [year, month, selectedRange.start, selectedRange.end]);

  const transitionClass = isTransitioning
    ? `animate-grid-fade-slide`
    : '';

  // Drag handlers
  const handleMouseDown = useCallback((day) => {
    if (day) onDragStart(day);
  }, [onDragStart]);

  const handlePointerDown = useCallback((day, event) => {
    if (day && event.pointerType !== 'mouse') onDragStart(day);
  }, [onDragStart]);

  const handleMouseEnter = useCallback((day) => {
    if (day && isDragging) onDragMove(day);
  }, [isDragging, onDragMove]);

  const handlePointerMove = useCallback((day, event) => {
    if (day && isDragging && event.pointerType !== 'mouse') onDragMove(day);
  }, [isDragging, onDragMove]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) onDragEnd();
  }, [isDragging, onDragEnd]);

  const handlePointerUp = useCallback(() => {
    if (isDragging) onDragEnd();
  }, [isDragging, onDragEnd]);

  return (
    <div
      className={`w-full select-none ${isDragging ? 'cursor-crosshair' : ''}`}
      onMouseUp={handleMouseUp}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-0 mb-[5px] pb-[8px] border-b border-[#ece7ea] dark:border-white/10">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`text-center font-body text-[0.58rem] sm:text-[0.62rem] tracking-[0.06em] sm:tracking-[0.08em] text-[#3f3f45] dark:text-white/50 py-[2px] uppercase transition-colors ${
              i >= 5 ? 'font-bold' : 'font-semibold'
            }`}
            style={i >= 5 ? { color: '#d64045' } : undefined}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div
        className={`grid grid-cols-7 gap-y-[2px] sm:gap-y-[4px] ${transitionClass}`}
      >
        {cells.map((cell) => (
          <CalendarDay
            key={cell.key}
            day={cell.day}
            isToday={cell.isToday}
            isSaturday={cell.isSaturday}
            isSunday={cell.isSunday}
            holidayInfo={cell.holidayInfo}
            rangeStatus={cell.rangeStatus}
            accentColor={accentColor}
            onClick={onDateClick}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            isDragging={isDragging}
            hasDragged={hasDragged}
          />
        ))}
      </div>
    </div>
  );
}

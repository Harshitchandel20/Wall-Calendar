import React, { useCallback, useMemo } from 'react';
import CalendarContainer from './components/CalendarContainer';
import { useCalendarState } from './hooks/useCalendarState';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getSeasonData } from './data/seasons';
import { getNotesKey, createDate } from './utils/calendarUtils';
import './index.css';

/**
 * App — Root component for the Wall Calendar.
 * Manages global state (month, date range, notes) and wires
 * everything into CalendarContainer.
 */
export default function App() {
  const {
    currentMonth,
    currentYear,
    selectedRange,
    isDragging,
    hasDragged,
    transitionDirection,
    isTransitioning,
    nextMonth,
    prevMonth,
    goToday,
    selectDate,
    dragStart,
    dragMove,
    dragEnd,
    clearSelection,
    onTransitionEnd,
  } = useCalendarState();

  // Notes persistence via localStorage — scoped per month to avoid notes swapping when changing selection
  const notesKey = getNotesKey(currentYear, currentMonth);
  const [notes, setNotes] = useLocalStorage(notesKey, '');

  // Season data for current month
  const seasonData = getSeasonData(currentMonth);

  // Handle date click → range selection
  const handleDateClick = useCallback(
    (day) => {
      const date = createDate(currentYear, currentMonth, day);
      selectDate(date);
    },
    [currentYear, currentMonth, selectDate]
  );

  // Drag-to-select handlers
  const handleDragStart = useCallback(
    (day) => {
      const date = createDate(currentYear, currentMonth, day);
      dragStart(date);
    },
    [currentYear, currentMonth, dragStart]
  );

  const handleDragMove = useCallback(
    (day) => {
      const date = createDate(currentYear, currentMonth, day);
      dragMove(date);
    },
    [currentYear, currentMonth, dragMove]
  );

  const handleDragEnd = useCallback(() => {
    dragEnd();
  }, [dragEnd]);

  // Check if current month is today's month
  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return currentMonth === now.getMonth() && currentYear === now.getFullYear();
  }, [currentMonth, currentYear]);

  return (
    <CalendarContainer
      year={currentYear}
      month={currentMonth}
      seasonData={seasonData}
      selectedRange={selectedRange}
      isDragging={isDragging}
      hasDragged={hasDragged}
      notes={notes}
      onDateClick={handleDateClick}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onNotesChange={setNotes}
      onPrevMonth={prevMonth}
      onNextMonth={nextMonth}
      onGoToday={goToday}
      onClearSelection={clearSelection}
      isCurrentMonth={isCurrentMonth}
      transitionDirection={transitionDirection}
      isTransitioning={isTransitioning}
      onTransitionEnd={onTransitionEnd}
    />
  );
}

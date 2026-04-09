import React from 'react';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import './CalendarBody.css';

/**
 * CalendarBody — Bottom section of the calendar sheet.
 * Desktop: Notes (left 35%) + Calendar Grid (right 65%) side by side.
 * Mobile: Stacks vertically — Grid on top, Notes below.
 */
export default function CalendarBody({
  year,
  month,
  selectedRange,
  accentColor,
  onDateClick,
  notes,
  onNotesChange,
  transitionDirection,
  isTransitioning,
  onTransitionEnd,
}) {
  return (
    <div className="calendar-body">
      <div className="calendar-body-notes">
        <NotesSection
          notes={notes}
          onNotesChange={onNotesChange}
          selectedRange={selectedRange}
          accentColor={accentColor}
        />
      </div>

      <div className="calendar-body-grid">
        <CalendarGrid
          year={year}
          month={month}
          selectedRange={selectedRange}
          accentColor={accentColor}
          onDateClick={onDateClick}
          transitionDirection={transitionDirection}
          isTransitioning={isTransitioning}
          onTransitionEnd={onTransitionEnd}
        />
      </div>
    </div>
  );
}

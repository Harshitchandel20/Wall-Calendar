import React, { memo, useCallback } from 'react';

/**
 * CalendarDay — Individual date cell with multiple visual states.
 * Rebuilt using Tailwind CSS utilities and group-hover classes.
 * Enhanced with premium Dark Mode and Holiday Popups.
 */
const CalendarDay = memo(function CalendarDay({
  day,
  isToday,
  isSaturday,
  isSunday,
  holidayInfo,
  rangeStatus,
  accentColor,
  onClick,
  onMouseDown,
  onMouseEnter,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  isDragging,
  hasDragged,
}) {
  if (!day) {
    return <div className="min-h-[42px] sm:min-h-[40px] cursor-default pointer-events-none" />;
  }

  const isSelected = rangeStatus === 'start' || rangeStatus === 'end';
  const isWeekend = isSaturday || isSunday;

  // Background states for range selection
  let bgClass = 'bg-transparent';
  if (rangeStatus === 'in-range') {
    bgClass = 'bg-[var(--selection-range,rgba(43,126,193,0.1))] dark:bg-[var(--selection-range,rgba(43,126,193,0.2))] animate-range-highlight';
  } else if (rangeStatus === 'start' && rangeStatus !== 'end') {
    bgClass = 'bg-gradient-to-r from-transparent from-50% to-[var(--selection-range,rgba(43,126,193,0.1))] dark:to-[var(--selection-range,rgba(43,126,193,0.2))] to-50%';
  } else if (rangeStatus === 'end' && rangeStatus !== 'start') {
    bgClass = 'bg-gradient-to-r from-[var(--selection-range,rgba(43,126,193,0.1))] dark:from-[var(--selection-range,rgba(43,126,193,0.2))] from-50% to-transparent to-50%';
  }

  // Base text coloring
  let textClass = 'text-[#18181b] dark:text-white/80 font-semibold';
  if (holidayInfo) {
    textClass = 'text-[var(--holiday-dot,#D4663E)] dark:text-[#ff8a66] font-medium';
  } else if (isWeekend) {
    textClass = 'text-[#d64045] dark:text-[#ff7f86] font-semibold';
  }
  if (rangeStatus === 'in-range') {
    textClass = 'text-[#141418] dark:text-white/90 font-semibold'; 
  }

  const handleMouseDown = useCallback((e) => {
    // Only intercept left clicks for drag/select handling
    if (e.button === 0) {
      e.preventDefault();
      onMouseDown(day);
    }
  }, [day, onMouseDown]);

  const handleMouseEnter = useCallback(() => {
    if (isDragging) onMouseEnter(day);
  }, [day, isDragging, onMouseEnter]);

  return (
    <div
      className={`group relative flex flex-col items-center justify-center py-[5px] sm:py-[6px] min-h-[42px] sm:min-h-[40px] cursor-pointer transition-all duration-150 select-none touch-none focus-visible:outline-2 focus-visible:outline-[var(--accent)] outline-offset-1 rounded-sm ${bgClass} ${isSelected ? 'z-30' : 'z-0 hover:z-20'}`}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') {
          e.preventDefault();
          onPointerDown?.(day, e);
        }
      }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' && isDragging) {
          onPointerMove?.(day, e);
        }
      }}
      onPointerUp={(e) => {
        if (e.pointerType !== 'mouse' && isDragging && !hasDragged) {
          onPointerUp?.(day, e);
        }
      }}
      onPointerCancel={(e) => {
        if (e.pointerType !== 'mouse') {
          onPointerCancel?.(day, e);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${day}${holidayInfo ? `, ${holidayInfo.name}` : ''}${isToday ? ', Today' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(day);
        }
      }}
      style={{ '--accent': accentColor }}
    >
      <span
        className={`flex items-center justify-center w-[36px] sm:w-[38px] h-[36px] sm:h-[38px] rounded-full font-body text-[0.95rem] sm:text-[1rem] transition-all duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative z-10 ${
          isSelected
            ? 'font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)] group-hover:scale-[1.06] group-hover:shadow-[0_3px_12px_rgba(0,0,0,0.18)] dark:group-hover:shadow-[0_3px_12px_rgba(0,0,0,0.6)]' 
            : `${textClass} group-hover:scale-[1.08] group-hover:bg-black/5 dark:group-hover:bg-white/10 group-hover:text-[#333] dark:group-hover:text-white group-active:scale-[0.92] group-active:duration-75`
        }`}
        style={isSelected ? { backgroundColor: accentColor } : undefined}
      >
        {day}
      </span>

      {/* Holiday indicator dot + Popup */}
      {holidayInfo && (
        <>
          {/* Static Dot */}
          <span className="w-[4px] h-[4px] rounded-full bg-[var(--holiday-dot,#D4663E)] dark:bg-[#ff8a66] mt-[2px] z-20 transition-transform duration-200 group-hover:scale-150" />
          
          {/* Mini Popup Card attached on hover over the entire cell */}
          <div className="absolute bottom-full mb-3 w-[160px] sm:w-[200px] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 pointer-events-none">
            <div className="bg-white/95 dark:bg-[#1e1e24]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-xl p-3 shadow-2xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col gap-1 items-center text-center relative pointer-events-auto">
              <span className="text-2xl leading-none mb-1 shadow-sm mix-blend-luminosity">{holidayInfo.emoji}</span>
              <span className="font-display font-semibold tracking-wide text-[0.8rem] text-[#333] dark:text-white leading-tight">{holidayInfo.name}</span>
              <span className="font-body text-[0.65rem] text-[#777] dark:text-white/60 leading-snug">{holidayInfo.description}</span>
              {/* Sub-arrow tip */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-solid border-t-white/95 dark:border-t-[#1e1e24]/95 border-t-[6px] border-x-transparent border-x-[6px] border-b-0" />
            </div>
          </div>
        </>
      )}

      {/* Today indicator ring */}
      {isToday && !isSelected && (
        <span 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] sm:w-[34px] h-[38px] sm:h-[34px] rounded-full border-2 animate-today-glow z-0 pointer-events-none opacity-80" 
          style={{ borderColor: accentColor }} 
        />
      )}
    </div>
  );
});

export default CalendarDay;

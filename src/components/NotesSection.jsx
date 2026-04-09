import React, { useCallback, useRef } from 'react';
import { formatDateRange, getDaysInRange } from '../utils/calendarUtils';

/**
 * NotesSection — Full-width lined-paper textarea at the bottom of the sheet.
 * Supports range-based labeling and localStorage persistence. Enhanced with Tailwind and Dark Mode.
 */
export default function NotesSection({
  notes,
  onNotesChange,
  selectedRange,
  accentColor,
}) {
  const textareaRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      onNotesChange(e.target.value);
    },
    [onNotesChange]
  );

  const hasRange = selectedRange.start !== null;
  const rangeLabel = formatDateRange(selectedRange.start, selectedRange.end);
  const daysCount = getDaysInRange(selectedRange.start, selectedRange.end);

  return (
    <div className="pt-1">
      <div className="flex items-center gap-[8px] mb-[8px] flex-wrap">
        <span className="inline-flex items-center rounded-full bg-[#e6a2b3] text-[#402a33] px-3 py-[2px] font-body text-[0.86rem] font-semibold tracking-[0.01em] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">Note:</span>
        {hasRange && (
          <span
            className="font-body text-[0.62rem] font-semibold px-[9px] py-[3px] rounded-[10px] tracking-[0.03em] whitespace-nowrap border border-solid transition-all duration-200"
            style={{
              backgroundColor: `${accentColor}12`,
              color: accentColor,
              borderColor: `${accentColor}30`,
            }}
          >
            {rangeLabel}
            {daysCount > 0 && ` · ${daysCount} day${daysCount > 1 ? 's' : ''}`}
          </span>
        )}
      </div>

      <div className="w-full min-h-[96px] [--line-color:rgba(120,120,130,0.28)] dark:[--line-color:rgba(255,255,255,0.08)]">
        <textarea
          ref={textareaRef}
          className="w-full min-h-[80px] sm:min-h-[96px] border-none outline-none resize-y font-body text-[0.86rem] sm:text-[0.84rem] leading-[30px] text-[#3d3d3d] dark:text-white/75 bg-transparent p-0 overflow-y-auto transition-colors duration-200 focus:text-[#1f1f1f] dark:focus:text-white placeholder:text-[#9f9fa8] dark:placeholder:text-white/25 placeholder:italic placeholder:text-[0.78rem]"
          value={notes}
          onChange={handleChange}
          placeholder="Write your notes here..."
          spellCheck={false}
          rows={4}
          aria-label="Notes for this month"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 25px,
              var(--line-color) 25px,
              var(--line-color) 26px
            )`,
            backgroundPosition: '0 0'
          }}
        />
      </div>
    </div>
  );
}

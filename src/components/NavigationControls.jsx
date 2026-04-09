import React from 'react';

/**
 * NavigationControls — Prev/Next month navigation + Today button.
 * Premium typography with elegant month/year display. Enhanced with Tailwind and Dark Mode.
 */
export default function NavigationControls({
  onPrev,
  onNext,
  onGoToday,
  monthName,
  year,
  isCurrentMonth,
  accentColor,
}) {
  return (
    <div className="flex items-center justify-between px-1 sm:px-2 py-1 sm:py-2 mb-1">
      <button
        className="flex items-center justify-center w-[30px] sm:w-[34px] h-[30px] sm:h-[34px] rounded-full border border-[#d8d8d8] dark:border-white/10 bg-white/80 dark:bg-white/5 text-[#4a4a4a] dark:text-white/80 cursor-pointer transition-all duration-200 shrink-0 hover:bg-white dark:hover:bg-white/10 hover:text-[#222] dark:hover:text-white hover:border-[#bfbfbf] dark:hover:border-white/20 hover:scale-[1.06] active:scale-[0.92]"
        onClick={onPrev}
        aria-label="Previous month"
        title="Previous month"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="flex flex-col items-center gap-[5px]">
        <div className="flex items-baseline gap-1.5 sm:gap-2">
          <span className="font-display text-[1.85rem] sm:text-[2rem] font-bold tracking-[-0.01em] text-[#2f2f2f] dark:text-[#f3f4f6] leading-none transition-colors">{monthName}</span>
          <span className="font-body text-[1.05rem] sm:text-[1.15rem] font-semibold tracking-[0.01em] text-[#d6849d] dark:text-[#f2a2ba] leading-none transition-colors">| {year}</span>
        </div>

        {/* Today button */}
        <button
          className={`flex items-center gap-1 font-body text-[0.58rem] sm:text-[0.62rem] font-semibold tracking-[0.06em] bg-white/80 dark:bg-white/5 border rounded-xl px-2 sm:px-[10px] py-[2px] sm:py-[3px] cursor-pointer transition-all duration-200 uppercase hover:bg-white dark:hover:bg-white/10 active:scale-[0.94] ${
            isCurrentMonth 
              ? 'text-[var(--accent)] border-[var(--accent)] opacity-70' 
              : 'text-[#888] dark:text-white/60 border-[#ddd] dark:border-white/20 hover:text-[var(--accent)] dark:hover:text-[var(--accent)] hover:border-[var(--accent)] dark:hover:border-[var(--accent)]'
          }`}
          onClick={onGoToday}
          title="Go to today"
          style={{ '--accent': accentColor }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>Today</span>
        </button>
      </div>

      <button
        className="flex items-center justify-center w-[30px] sm:w-[34px] h-[30px] sm:h-[34px] rounded-full border border-[#d8d8d8] dark:border-white/10 bg-white/80 dark:bg-white/5 text-[#4a4a4a] dark:text-white/80 cursor-pointer transition-all duration-200 shrink-0 hover:bg-white dark:hover:bg-white/10 hover:text-[#222] dark:hover:text-white hover:border-[#bfbfbf] dark:hover:border-white/20 hover:scale-[1.06] active:scale-[0.92]"
        onClick={onNext}
        aria-label="Next month"
        title="Next month"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useRef, useCallback, useEffect } from 'react';
import SpiralBinding from './SpiralBinding';
import HeroImage from './HeroImage';
import NavigationControls from './NavigationControls';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import ThemeToggle from './ThemeToggle';
import BorderGlow from './BorderGlow';

/**
 * CalendarContainer — The main "paper sheet" wrapper with BorderGlow effect.
 */
export default function CalendarContainer({
  year,
  month,
  seasonData,
  selectedRange,
  isDragging,
  hasDragged,
  notes,
  onDateClick,
  onDragStart,
  onDragMove,
  onDragEnd,
  onNotesChange,
  onPrevMonth,
  onNextMonth,
  onGoToday,
  isCurrentMonth,
  transitionDirection,
  isTransitioning,
  onTransitionEnd,
}) {
  const sheetRef = useRef(null);

  // Subtle tilt effect on desktop
  const handleMouseMove = useCallback((e) => {
    if (!sheetRef.current || window.innerWidth < 900) return;
    const rect = sheetRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 1.2;
    const rotateX = ((centerY - y) / centerY) * 0.8;
    sheetRef.current.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
    }
  }, []);

  // Global mouseup to end drag even if mouse leaves the grid
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) onDragEnd();
    };
    const handleGlobalPointerUp = () => {
      if (isDragging) onDragEnd();
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [isDragging, onDragEnd]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8 relative">
      <ThemeToggle />

      <BorderGlow
        colors={['#c084fc', '#f472b6', '#38bdf8']}
        borderRadius={12}
        borderWidth={1.5}
        speed={0.8}
        glowBlur={10}
        className="w-full max-w-[560px] lg:max-w-[700px]"
      >
        <div
          ref={sheetRef}
          className="w-full rounded-xl overflow-hidden relative transition-[transform,background-color,border-color,box-shadow] duration-300 shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.72)] bg-white/50 dark:bg-[#0c0a12]/80 backdrop-blur-3xl"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Spiral binding at top */}
          <SpiralBinding />

          {/* Hero image section */}
          <HeroImage
            image={seasonData.image}
            month={month}
            year={year}
            accentColor={seasonData.accentColor}
            season={seasonData.season}
            description={seasonData.description}
            transitionDirection={transitionDirection}
            isTransitioning={isTransitioning}
            onTransitionEnd={onTransitionEnd}
          />

          <div className="relative bg-gradient-to-br from-[#f5f2f4] via-[#f8f0f2] to-[#f3d8db] dark:from-[#0f0c16] dark:via-[#15101d] dark:to-[#1c1425] border-t border-black/10 dark:border-white/12 pt-6 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-4">
            <div className="grid grid-cols-1 md:grid-cols-[0.34fr_0.66fr] gap-3 sm:gap-4 items-stretch">
              <div className="order-2 md:order-1 rounded-2xl bg-white/35 dark:bg-[#0b0911]/60 border border-black/8 dark:border-white/12 p-3 sm:p-4">
                <NotesSection
                  notes={notes}
                  onNotesChange={onNotesChange}
                  selectedRange={selectedRange}
                  accentColor={seasonData.accentColor}
                />
              </div>

              <div className="order-1 md:order-2 rounded-[28px] bg-white/88 dark:bg-[#100d18]/94 border border-black/10 dark:border-white/12 p-3 sm:p-4 shadow-[0_16px_38px_rgba(0,0,0,0.12)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.5)]">
                <NavigationControls
                  onPrev={onPrevMonth}
                  onNext={onNextMonth}
                  onGoToday={onGoToday}
                  monthName={seasonData.name}
                  year={year}
                  isCurrentMonth={isCurrentMonth}
                  accentColor={seasonData.accentColor}
                />

                <div className="px-1 sm:px-2 pb-1">
                  <CalendarGrid
                    year={year}
                    month={month}
                    selectedRange={selectedRange}
                    isDragging={isDragging}
                    hasDragged={hasDragged}
                    accentColor={seasonData.accentColor}
                    onDateClick={onDateClick}
                    onDragStart={onDragStart}
                    onDragMove={onDragMove}
                    onDragEnd={onDragEnd}
                    transitionDirection={transitionDirection}
                    isTransitioning={isTransitioning}
                    onTransitionEnd={onTransitionEnd}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}

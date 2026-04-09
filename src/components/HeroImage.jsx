import React, { useRef, useCallback } from 'react';
import { getMonthName } from '../utils/calendarUtils';

/**
 * HeroImage — Large seasonal image with gradient overlay, parallax zoom,
 * and month/year text overlay. Enhanced with Tailwind and fluid typography.
 */
export default function HeroImage({ 
  image, 
  month, 
  year, 
  accentColor, 
  season,
  description,
  transitionDirection,
  isTransitioning,
  onTransitionEnd 
}) {
  const monthName = getMonthName(month);
  const imageRef = useRef(null);

  const transitionClass = isTransitioning
    ? transitionDirection === 'right'
      ? 'hero-month-transition hero-month-transition-prev'
      : 'hero-month-transition hero-month-transition-next'
    : '';

  // Subtle parallax on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!imageRef.current || window.innerWidth < 600) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    imageRef.current.style.setProperty('--parallax-x', `${x * -8}px`);
    imageRef.current.style.setProperty('--parallax-y', `${y * -6}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (imageRef.current) {
      imageRef.current.style.setProperty('--parallax-x', '0px');
      imageRef.current.style.setProperty('--parallax-y', '0px');
    }
  }, []);

  return (
    <div
      className="w-full overflow-hidden relative h-[220px] sm:h-[260px] md:h-[300px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full ${transitionClass}`}
        onAnimationEnd={onTransitionEnd}
      >
        <div
          ref={imageRef}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          style={{
            backgroundImage: `url(${image})`,
            transform: `scale(1.05) translate(var(--parallax-x, 0px), var(--parallax-y, 0px))`
          }}
        />
      </div>

      {/* Bottom gradient for text readability */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0, 0, 0, 0.55) 0%,
            rgba(0, 0, 0, 0.25) 40%,
            transparent 100%
          )`,
        }}
      />

      {/* Accent color gradient sweep */}
      <div
        className={`absolute inset-0 pointer-events-none z-10 ${isTransitioning ? 'hero-accent-sheen' : ''}`}
        style={{
          background: `linear-gradient(
            135deg,
            transparent 35%,
            ${accentColor}55 65%,
            ${accentColor}99 85%,
            ${accentColor}cc 100%
          )`,
        }}
      />

      {/* Month/Year overlay text */}
      <div className="absolute bottom-0 right-0 z-20 text-right p-4 sm:p-5 md:p-6 text-white text-shadow-md">
        <span className="block font-body text-[0.82rem] sm:text-[0.9rem] md:text-[0.95rem] font-medium tracking-[2px] md:tracking-[3px] opacity-85 mb-0.5">{year}</span>
        <h1 className="m-0 leading-[1.1] font-display text-[1.8rem] sm:text-[2.1rem] md:text-[2.6rem] font-extrabold tracking-[3px] md:tracking-[5px] drop-shadow-md">{monthName.toUpperCase()}</h1>
        <span className="block font-body text-[0.6rem] sm:text-[0.65rem] md:text-[0.68rem] font-normal tracking-[2px] opacity-75 mt-1.5 uppercase">{season} · {description}</span>
      </div>
    </div>
  );
}

import React from 'react';

/**
 * SpiralBinding — Black tab-style punch holes over the top image area,
 * inspired by real spiral-bound wall calendars.
 */
export default function SpiralBinding() {
  const ringCount = 22;

  return (
    <div className="pointer-events-none absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 z-30 w-[95%]">
      <div className="flex justify-center gap-[4px] sm:gap-[6px] px-2 sm:px-3">
        {Array.from({ length: ringCount }, (_, i) => (
          <div
            key={i}
            className="w-[12px] sm:w-[14px] h-[10px] sm:h-[12px] rounded-[2px] bg-[#06070b]/96 border border-black/70 shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
          >
            <div className="w-[3px] sm:w-[4px] h-[3px] sm:h-[4px] rounded-full bg-[#a7acb7] mx-auto mt-[1px] sm:mt-[2px] shadow-[inset_0_0_1px_rgba(0,0,0,0.7)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

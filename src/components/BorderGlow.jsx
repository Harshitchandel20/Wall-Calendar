import { useRef, useEffect, useCallback } from 'react';

/**
 * BorderGlow — Always-rolling conic-gradient border.
 *
 * Uses the CSS mask-composite: exclude technique so the gradient is
 * ONLY visible in the border strip — never inside the content area,
 * regardless of how transparent the child's background is.
 *
 * Props:
 *   colors       — gradient color stops (default: purple/pink/sky)
 *   borderRadius — px radius of the card (default 12)
 *   borderWidth  — border strip thickness in px (default 1.5)
 *   speed        — degrees per frame (default 1, higher = faster)
 *   glowBlur     — outer glow blur spread in px (default 8)
 *   className    — extra classes for the wrapper
 */
export default function BorderGlow({
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  borderRadius = 12,
  borderWidth = 1.5,
  speed = 1,
  glowBlur = 8,
  className = '',
  style = {},
  children,
}) {
  const borderRef = useRef(null);
  const glowRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  // Build conic-gradient string at the given angle
  const buildGradient = useCallback((angle) => {
    const stops = colors.flatMap((c, i) => {
      const pct = Math.round((i / colors.length) * 100);
      return [`${c} ${pct}%`];
    });
    stops.push(`${colors[0]} 100%`); // close the loop
    return `conic-gradient(from ${angle.toFixed(1)}deg at 50% 50%, ${stops.join(', ')})`;
  }, [colors]);

  // Build a multi-layer box-shadow for the subtle outer glow
  const buildGlow = useCallback(() => {
    return colors.map((c, i) => {
      const blur = glowBlur + i * 4;
      return `0 0 ${blur}px ${Math.round(blur / 3)}px ${c}55`;
    }).join(', ');
  }, [colors, glowBlur]);

  // Start the always-on rolling animation
  useEffect(() => {
    const tick = () => {
      angleRef.current = (angleRef.current + speed) % 360;
      const grad = buildGradient(angleRef.current);

      if (borderRef.current) {
        // Apply as border-box background so it only fills the border area
        borderRef.current.style.background = `${grad} border-box`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, buildGradient]);

  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius: `${borderRadius}px`, ...style }}
    >
      {/*
        ── The gradient border ring ──
        Uses the CSS gradient-border trick:
          • background covers both border-box and padding-box areas
          • the mask EXCLUDES the padding-box (inner area)
          • result: gradient visible ONLY in the border strip
        zIndex: 2 → sits above the content so the glow renders on top of edges
      */}
      <div
        ref={borderRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          border: `${borderWidth}px solid transparent`,
          // background is set via RAF; initial value:
          background: `${buildGradient(0)} border-box`,
          // Mask out the inner area — ONLY shows the border strip
          WebkitMask:
            'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/*
        ── Outer ambient glow ──
        A box-shadow layer that blooms softly around the border.
        Also sits above content (z-index 2) but pointer-events: none.
      */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          boxShadow: buildGlow(),
          opacity: 0.5,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/*
        ── Content ──
        z-index 1 — sits between body background and the border ring overlay.
        overflow:hidden clips children cleanly inside the border-radius.
        The border ring (z=2) renders on top, perfectly overlaying the edge.
      */}
      <div
        style={{
          position: 'relative',
          borderRadius: `${borderRadius}px`,
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}

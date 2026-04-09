# Frontend Engineering Challenge: Interactive Wall Calendar

A polished, responsive wall-calendar inspired component built with React and Vite.  
This project focuses on frontend architecture, interaction quality, and visual detail while staying strictly frontend-only.

## Submission Links

- Source code repository: ADD_YOUR_PUBLIC_GITHUB_OR_GITLAB_LINK
- Live demo (optional): ADD_YOUR_VERCEL_NETLIFY_OR_GITHUB_PAGES_LINK

## Challenge Requirement Coverage

### 1) Wall Calendar Aesthetic
- Hero image as the visual anchor at the top
- Spiral/binding treatment and layered paper-like card styling
- Dedicated notes area integrated with the month layout

### 2) Day Range Selector
- Select a start date and end date using click/drag on desktop
- Touch/pointer range selection on mobile
- Distinct visual states for:
  - start date
  - end date
  - dates in-between

### 3) Integrated Notes Section
- Built-in notes panel in the same calendar sheet
- Notes persist with localStorage
- Notes are currently scoped by month

### 4) Fully Responsive Design
- Desktop: two-panel lower layout (calendar + notes)
- Mobile: calendar panel first, notes panel below
- Date selection and notes remain usable on touch devices

## Creative Additions

- Seasonal hero imagery and month-based theming
- Holiday markers with contextual tooltip details
- Theme toggle (light/dark)
- Animated month transitions and subtle motion polish

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS
- Plain CSS for custom visual effects and animation details

## Architecture

- App state and orchestration: `App.jsx` is the root coordinator for month/year state, selected range, transitions, and notes wiring.
- Range selection reducer: `useCalendarState` uses a reducer to manage range lifecycle (start, drag, end), per-month selection memory, and transition direction.
- Notes persistence hook: `useLocalStorage` handles reading/writing notes to localStorage and syncing values when the month-scoped key changes.
- Data flow: `App.jsx` computes derived props (season data, notes key, handlers) and passes them into presentational components (`CalendarContainer` -> `CalendarGrid` / `NotesSection`).

## Known Decisions

- Notes are intentionally scoped by month, not by selected date range.
- Reason: this avoids accidental note "disappearing" when users change date selections within the same month.
- Implementation detail: notes key is computed as month-level (`getNotesKey(currentYear, currentMonth)`) in `App.jsx`.

## Accessibility

- Keyboard support: each date cell is focusable and supports `Enter`/`Space` for date selection.
- Touch and pointer support: drag range selection supports pointer/touch interactions on mobile in addition to mouse drag on desktop.
- Semantic hinting: date cells include `role="button"` and descriptive `aria-label` text (day, holiday, today state).
- Reduced-motion consideration: transition styles include reduced-motion handling to avoid heavy animations for users who prefer less motion.

## Project Scope

- Frontend only (no backend/API/database)
- Client-side persistence via localStorage

## Local Development

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build production bundle

```bash
npm run build
```

## Notes

- Holiday data is currently configured with an India-focused set for 2026 plus a few fallback fixed holidays for other years.

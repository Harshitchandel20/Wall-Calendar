import { useReducer, useCallback } from 'react';

/**
 * Calendar state reducer — manages month navigation, date range selection
 * (click + drag), and transition direction for animations.
 */

const today = new Date();
const initialState = {
  currentMonth: today.getMonth(),
  currentYear: today.getFullYear(),
  selectedRange: { start: null, end: null },
  selectionStep: 0, // 0 = no selection, 1 = start picked, 2 = range complete
  isDragging: false,
  hasDragged: false,
  prevStart: null,
  prevEnd: null,
  transitionDirection: 'none', // 'left' | 'right' | 'none'
  isTransitioning: false,
  monthSelections: {}, // Store selections per month
};

function calendarReducer(state, action) {
  switch (action.type) {
    case 'NEXT_MONTH': {
      let newMonth = state.currentMonth + 1;
      let newYear = state.currentYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
      
      const currentMonthKey = `${state.currentYear}-${state.currentMonth}`;
      const nextMonthKey = `${newYear}-${newMonth}`;
      const savedSelection = (state.monthSelections && state.monthSelections[nextMonthKey]) || { start: null, end: null };

      return {
        ...state,
        currentMonth: newMonth,
        currentYear: newYear,
        transitionDirection: 'left',
        isTransitioning: true,
        monthSelections: {
          ...(state.monthSelections || {}),
          [currentMonthKey]: state.selectedRange,
        },
        selectedRange: savedSelection,
        selectionStep: savedSelection.start && savedSelection.end ? 2 : (savedSelection.start ? 1 : 0),
        isDragging: false,
      };
    }

    case 'PREV_MONTH': {
      let newMonth = state.currentMonth - 1;
      let newYear = state.currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }

      const currentMonthKey = `${state.currentYear}-${state.currentMonth}`;
      const prevMonthKey = `${newYear}-${newMonth}`;
      const savedSelection = (state.monthSelections && state.monthSelections[prevMonthKey]) || { start: null, end: null };

      return {
        ...state,
        currentMonth: newMonth,
        currentYear: newYear,
        transitionDirection: 'right',
        isTransitioning: true,
        monthSelections: {
          ...(state.monthSelections || {}),
          [currentMonthKey]: state.selectedRange,
        },
        selectedRange: savedSelection,
        selectionStep: savedSelection.start && savedSelection.end ? 2 : (savedSelection.start ? 1 : 0),
        isDragging: false,
      };
    }

    case 'GO_TODAY': {
      const now = new Date();
      const targetMonth = now.getMonth();
      const targetYear = now.getFullYear();
      if (state.currentMonth === targetMonth && state.currentYear === targetYear) {
        return state;
      }
      const currentTotal = state.currentYear * 12 + state.currentMonth;
      const targetTotal = targetYear * 12 + targetMonth;

      const currentMonthKey = `${state.currentYear}-${state.currentMonth}`;
      const targetMonthKey = `${targetYear}-${targetMonth}`;
      const savedSelection = (state.monthSelections && state.monthSelections[targetMonthKey]) || { start: null, end: null };

      return {
        ...state,
        currentMonth: targetMonth,
        currentYear: targetYear,
        transitionDirection: targetTotal > currentTotal ? 'left' : 'right',
        isTransitioning: true,
        monthSelections: {
          ...(state.monthSelections || {}),
          [currentMonthKey]: state.selectedRange,
        },
        selectedRange: savedSelection,
        selectionStep: savedSelection.start && savedSelection.end ? 2 : (savedSelection.start ? 1 : 0),
        isDragging: false,
      };
    }

    case 'SELECT_DATE': {
      // Used primarily for keyboard (Enter/Space) interactions
      const clickedDate = action.payload;

      if (state.selectionStep === 0 || state.selectionStep === 2) {
        return {
          ...state,
          selectedRange: { start: clickedDate, end: null },
          selectionStep: 1,
        };
      }

      if (state.selectionStep === 1) {
        const start = state.selectedRange.start;
        if (clickedDate.getTime() === start.getTime()) {
          return {
            ...state,
            selectedRange: { start: null, end: null },
            selectionStep: 0,
          };
        }
        if (clickedDate < start) {
          return { ...state, selectedRange: { start: clickedDate, end: start }, selectionStep: 2 };
        }
        return { ...state, selectedRange: { start: start, end: clickedDate }, selectionStep: 2 };
      }

      return state;
    }

    // --- Drag-to-select (also handles single clicks via hasDragged flag) ---
    case 'DRAG_START': {
      return {
        ...state,
        prevStart: state.selectedRange.start,
        prevEnd: state.selectedRange.end,
        selectedRange: { start: action.payload, end: null },
        selectionStep: 1,
        isDragging: true,
        hasDragged: false,
        anchor: action.payload,
      };
    }

    case 'DRAG_MOVE': {
      if (!state.isDragging || !state.anchor) return state;
      const dragDate = action.payload;
      const anchor = state.anchor;

      if (dragDate.getTime() !== anchor.getTime()) {
        if (dragDate < anchor) {
          return { ...state, selectedRange: { start: dragDate, end: anchor }, hasDragged: true };
        }
        return { ...state, selectedRange: { start: anchor, end: dragDate }, hasDragged: true };
      } else {
        return { ...state, selectedRange: { start: anchor, end: null }, hasDragged: true };
      }
    }

    case 'DRAG_END': {
      if (!state.isDragging) return state;

      const { start, end } = state.selectedRange;
      const { prevStart, prevEnd, hasDragged } = state;

      // Pure click (no dragging occurred) — toggle off if same date was already selected alone
      if (!hasDragged && start) {
        if (prevStart && !prevEnd && prevStart.getTime() === start.getTime()) {
          return {
            ...state,
            selectedRange: { start: null, end: null },
            selectionStep: 0,
            isDragging: false,
            hasDragged: false,
            prevStart: null,
            prevEnd: null,
          };
        }
      }

      return {
        ...state,
        isDragging: false,
        hasDragged: false,
        prevStart: null,
        prevEnd: null,
        selectionStep: start && end ? 2 : (start ? 1 : 0),
      };
    }

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedRange: { start: null, end: null },
        selectionStep: 0,
        isDragging: false,
        hasDragged: false,
        prevStart: null,
        prevEnd: null,
      };

    case 'TRANSITION_END':
      return {
        ...state,
        isTransitioning: false,
        transitionDirection: 'none',
      };

    default:
      return state;
  }
}

/**
 * Custom hook for calendar state management.
 * Supports click selection, drag-to-select, month navigation, and "go to today".
 */
export function useCalendarState() {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const nextMonth = useCallback(() => dispatch({ type: 'NEXT_MONTH' }), []);
  const prevMonth = useCallback(() => dispatch({ type: 'PREV_MONTH' }), []);
  const goToday = useCallback(() => dispatch({ type: 'GO_TODAY' }), []);
  const selectDate = useCallback(
    (date) => dispatch({ type: 'SELECT_DATE', payload: date }),
    []
  );
  const dragStart = useCallback(
    (date) => dispatch({ type: 'DRAG_START', payload: date }),
    []
  );
  const dragMove = useCallback(
    (date) => dispatch({ type: 'DRAG_MOVE', payload: date }),
    []
  );
  const dragEnd = useCallback(
    () => dispatch({ type: 'DRAG_END' }),
    []
  );
  const clearSelection = useCallback(
    () => dispatch({ type: 'CLEAR_SELECTION' }),
    []
  );
  const onTransitionEnd = useCallback(
    () => dispatch({ type: 'TRANSITION_END' }),
    []
  );

  return {
    ...state,
    hasDragged: state.hasDragged,
    nextMonth,
    prevMonth,
    goToday,
    selectDate,
    dragStart,
    dragMove,
    dragEnd,
    clearSelection,
    onTransitionEnd,
  };
}

import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import ProgressBar from './components/ProgressBar';
import PhaseSelection from './components/PhaseSelection';
import ResultView from './components/ResultView';
import { LIFE_VALUES } from './data/values';

function App() {
  // Phase 0: Intro
  // Phase 1: Select > 10
  // Phase 2: Select 10 (Convergence)
  // Phase 3: Select 5 (Final)
  // Phase 4: Result
  const [phase, setPhase] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

  // Data Persistence logic
  useEffect(() => {
    // Load from sessionStorage on mount (if valid state exists)
    const savedPhase = sessionStorage.getItem('lvs_phase');
    const savedIds = sessionStorage.getItem('lvs_ids');

    if (savedPhase && savedIds) {
      setPhase(parseInt(savedPhase, 10));
      setSelectedIds(JSON.parse(savedIds));
    }
  }, []);

  useEffect(() => {
    // Save to sessionStorage on change
    if (phase > 0) {
      sessionStorage.setItem('lvs_phase', phase.toString());
      sessionStorage.setItem('lvs_ids', JSON.stringify(selectedIds));
    }
  }, [phase, selectedIds]);

  const handleStart = () => {
    setPhase(1);
    setSelectedIds([]);
  };

  const handleToggle = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      // Check limits based on phase
      // Phase 1: No max (infinity)
      // Phase 2: Max 10
      // Phase 3: Max 5
      let maxLimit = Infinity;
      if (phase === 2) maxLimit = 10;
      if (phase === 3) maxLimit = 5;

      if (selectedIds.length < maxLimit) {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const handleNext = () => {
    if (phase === 1) {
      const count = selectedIds.length;
      if (count < 10) return; // Should be handled by button disable, but safety check

      if (count === 10) {
        // Skip Phase 2, go straight to Phase 3
        setPhase(3);
      } else {
        setPhase(2);
      }
    } else if (phase === 2) {
      setPhase(3);
    } else if (phase === 3) {
      setPhase(4);
    }
  };

  const handleRestart = () => {
    if (window.confirm('確定要重新開始嗎？目前的進度將會清除。')) {
      setSelectedIds([]);
      setPhase(0);
      sessionStorage.clear();
    }
  };

  // Derived state for available values in each phase
  const getAvailableValues = () => {
    if (phase === 1) return LIFE_VALUES;
    // For Phase 2 & 3, show only what was selected previously
    // However, if we filter, the stored `selectedIds` must be a subset.
    // In Phase 2, we need to select 10 from the IDs selected in Phase 1.
    // But `selectedIds` state tracks CURRENT selection.

    // PROBLEM: If we use a single `selectedIds` array, when moving to Phase 2,
    // we need to clear `selectedIds` but keep the "Pool" from Phase 1?
    // OR we differentiate "Pool" vs "Selected".

    // Refined Logic:
    // We need to store the "Pool" for the current phase.
    // When moving Phase 1 -> Phase 2:
    //   Pool = selectedIds (from Phase 1)
    //   selectedIds = [] (User starts picking 10 fresh? OR User keeps them all and Unselects?)
    //   PRD says: "收斂為 10 個". Usually implies picking FROM the larger set.
    //   If we keep them all selected, user has to deselect down to 10? Or clear all and pick 10?
    //   "收斂" implies narrowing.
    //   Approach A: Deselecting until 10. (Easier if count is 12. Hard if count is 40).
    //   Approach B: Clear and pick 10 from the Pool. (Better UX usually).

    // Let's implement Approach B:
    // We need a separate state for `poolIds` (values available in this phase).
    return LIFE_VALUES; // Placeholder if not strictly filtering
  };

  // Re-thinking State for "Pool":
  // We need `poolIds` state.
  const [poolIds, setPoolIds] = useState([]);

  // Update persistence for poolIds
  useEffect(() => {
    const savedPool = sessionStorage.getItem('lvs_pool');
    if (savedPool) setPoolIds(JSON.parse(savedPool));
  }, []);

  useEffect(() => {
    if (poolIds.length > 0) sessionStorage.setItem('lvs_pool', JSON.stringify(poolIds));
  }, [poolIds]);

  const handleNextWithPoolLogic = () => {
    if (phase === 1) {
      // Phase 1 -> 2
      // Pool becomes what we just selected.
      // Reset selectedIds to empty for the user to pick top 10 from this Pool.
      const currentSelection = [...selectedIds];

      if (currentSelection.length === 10) {
        // Special case: picked exactly 10.
        // Pool = currentSelection.
        // Skip Phase 2.
        // Go to Phase 3.
        // In Phase 3, we need to pick 5 from these 10.
        setPoolIds(currentSelection);
        setSelectedIds([]); // Clear for fresh pick of 5? OR Keep 10 and deselect? 
        // UX: "Pick 5 from 10". Better to start empty and pick 5.
        setPhase(3);
      } else {
        // Normal case: > 10.
        // Go to Phase 2.
        setPoolIds(currentSelection);
        setSelectedIds([]);
        setPhase(2);
      }
    } else if (phase === 2) {
      // Phase 2 -> 3
      // Pool becomes the 10 we just selected.
      setPoolIds([...selectedIds]);
      setSelectedIds([]); // Clear to pick top 5
      setPhase(3);
    } else if (phase === 3) {
      // Phase 3 -> 4 (Result)
      setPhase(4);
    }
  };

  // Resolve which values to show
  const currentAvailableValues = phase === 1
    ? LIFE_VALUES
    : LIFE_VALUES.filter(v => poolIds.includes(v.id));

  // Logic for Result View
  const resultValues = LIFE_VALUES.filter(v => selectedIds.includes(v.id));

  return (
    <div className="app-container">
      <header style={{ padding: '2rem 1rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.5px' }}>
          Clarity
        </h1>
      </header>

      <main style={{ flex: 1, padding: '1rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {phase > 0 && phase < 4 && <ProgressBar currentPhase={phase} />}

        {phase === 0 && <Intro onStart={handleStart} />}

        {phase >= 1 && phase <= 3 && (
          <PhaseSelection
            phase={phase}
            availableValues={currentAvailableValues}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            onNext={handleNextWithPoolLogic}
          />
        )}

        {phase === 4 && (
          <ResultView
            selectedValues={resultValues}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export default App;

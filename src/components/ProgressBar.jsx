import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentPhase }) => {
    // Logic: Phase 1 (1/3), Phase 2 (2/3), Phase 3 (3/3), Result (Complete)
    const progress = Math.min(100, (Math.max(0, currentPhase - 0.5) / 3) * 100);

    const steps = [
        { label: '初步篩選', phase: 1 },
        { label: '收斂聚焦', phase: 2 },
        { label: '最終決選', phase: 3 }
    ];

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto 2rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--color-text-muted)'
            }}>
                {steps.map((step) => (
                    <span
                        key={step.phase}
                        style={{
                            fontWeight: currentPhase >= step.phase ? 600 : 400,
                            color: currentPhase >= step.phase ? 'var(--color-accent)' : 'inherit',
                            opacity: currentPhase >= step.phase ? 1 : 0.5
                        }}
                    >
                        {step.label}
                    </span>
                ))}
            </div>
            <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden'
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        height: '100%',
                        background: 'var(--color-accent)',
                        borderRadius: '3px'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;

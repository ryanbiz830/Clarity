import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValueCard from './ValueCard';

const PhaseSelection = ({
    phase,
    availableValues,
    selectedIds,
    onToggle,
    onNext
}) => {

    // Phase Config
    const config = useMemo(() => {
        switch (phase) {
            case 1:
                return {
                    title: "初步篩選",
                    subtitle: "請憑直覺選出您認為重要的價值觀（至少 10 個）",
                    min: 10,
                    max: Infinity,
                    showCompareTip: false
                };
            case 2:
                return {
                    title: "收斂聚焦",
                    subtitle: "請從剛才的選擇中，保留最重要的 10 個",
                    min: 10,
                    max: 10,
                    showCompareTip: true
                };
            case 3:
                return {
                    title: "最終決選",
                    subtitle: "在這 10 個價值中，選出您生命中最核心的 5 個",
                    min: 5,
                    max: 5,
                    showCompareTip: true
                };
            default:
                return {};
        }
    }, [phase]);

    const count = selectedIds.length;
    const isValid = count >= config.min && (config.max === Infinity || count <= config.max);
    const isMaxReached = config.max !== Infinity && count >= config.max;

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '100px' }} // Space for fixed footer
        >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{config.title}</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)' }}>{config.subtitle}</p>

                {config.showCompareTip && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(251, 191, 36, 0.1)',
                            border: '1px solid rgba(251, 191, 36, 0.2)',
                            borderRadius: '8px',
                            display: 'inline-block',
                            maxWidth: '600px',
                            fontSize: '0.95rem',
                            color: '#fbbf24'
                        }}
                    >
                        💡 <strong>自我提問技巧：</strong><br />
                        「相較於 A，我覺得 B 更重要，原因是當兩者衝突，而且只能二選一時，我會傾向選擇 B」
                    </motion.div>
                )}
            </div>

            <div className="value-grid">
                <AnimatePresence>
                    {availableValues.map((value) => {
                        // In Phase 2 & 3, we only show values that were selected in previous steps?
                        // Actually, parent passes `availableValues`. 
                        // In Phase 1, it's all 40.
                        // In Phase 2, it's the filtered list from Phase 1.
                        return (
                            <ValueCard
                                key={value.id}
                                value={value}
                                isSelected={selectedIds.includes(value.id)}
                                onToggle={onToggle}
                                disabled={isMaxReached && !selectedIds.includes(value.id)}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Action Footer */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.5rem',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div style={{ marginRight: '2rem', fontSize: '1.1rem' }}>
                    已選擇: <strong style={{ color: count > config.max || (config.max !== Infinity && count < config.min) ? '#f87171' : 'var(--color-accent)' }}>{count}</strong>
                    {config.max !== Infinity ? ` / ${config.max}` : ''}
                </div>

                <motion.button
                    whileHover={isValid ? { scale: 1.05 } : {}}
                    whileTap={isValid ? { scale: 0.95 } : {}}
                    onClick={onNext}
                    disabled={!isValid}
                    style={{
                        background: isValid ? 'var(--color-accent)' : 'var(--color-bg-light)',
                        color: isValid ? '#0f172a' : 'var(--color-text-muted)',
                        padding: '0.75rem 3rem',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: isValid ? 'pointer' : 'not-allowed',
                        transition: 'all 0.3s'
                    }}
                >
                    下一步
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PhaseSelection;

import React from 'react';
import { motion } from 'framer-motion';

const ResultView = ({ selectedValues, onRestart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1rem',
                width: '100%',
            }}
        >
            <div
                className="result-card-container"
                style={{
                    background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <h2 style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                    background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    我的核心價值
                </h2>

                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
                    My Core Values
                </p>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {selectedValues.map((value, index) => (
                        <motion.div
                            key={value.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1rem',
                                borderRadius: '12px',
                                borderLeft: '4px solid var(--color-accent)',
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#fff',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{
                                opacity: 0.5,
                                marginRight: '1rem',
                                fontSize: '0.9rem',
                                fontFamily: 'Outfit'
                            }}>
                                0{index + 1}
                            </span>
                            {value.name}
                        </motion.div>
                    ))}
                </div>

                <div style={{
                    marginTop: '3rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-muted)'
                }}>
                    Clarity
                </div>
            </div>

            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                您可以截圖保存這張卡片
            </p>

            <button
                onClick={onRestart}
                style={{
                    color: 'var(--color-text-muted)',
                    textDecoration: 'underline',
                    fontSize: '0.9rem',
                    opacity: 0.7,
                    transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.7}
            >
                重新開始探索
            </button>
        </motion.div>
    );
};

export default ResultView;

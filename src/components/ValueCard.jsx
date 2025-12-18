import React from 'react';
import { motion } from 'framer-motion';

const ValueCard = ({ value, isSelected, onToggle, disabled }) => {
    return (
        <motion.div
            layout
            whileHover={!disabled ? { scale: 1.05, y: -5 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            onClick={() => !disabled && onToggle(value.id)}
            className={`value-card ${isSelected ? 'selected' : ''} ${disabled && !isSelected ? 'disabled' : ''}`}
            style={{
                background: isSelected
                    ? 'linear-gradient(135deg, var(--color-accent), #d97706)'
                    : 'var(--glass-bg)',
                border: isSelected
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--glass-border)',
                padding: '1.5rem',
                borderRadius: '16px',
                cursor: disabled && !isSelected ? 'not-allowed' : 'pointer',
                textAlign: 'center',
                boxShadow: isSelected
                    ? '0 10px 25px -5px rgba(245, 158, 11, 0.5)'
                    : 'var(--glass-shadow)',
                color: isSelected ? '#fff' : 'var(--color-text)',
                userSelect: 'none',
                opacity: disabled && !isSelected ? 0.5 : 1,
                transition: 'background 0.3s, border 0.3s, box-shadow 0.3s',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '80px' // Ensure a good base height
            }}
        >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
                {value.name}
            </h3>
        </motion.div>
    );
};

export default ValueCard;

import React from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                maxWidth: '800px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '60vh'
            }}
        >
            <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '1.5rem',
                background: 'linear-gradient(to right, #fff, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                letterSpacing: '-1px'
            }}>
                Clarity
            </h1>
            <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                fontWeight: 400
            }}>
                人生價值探索
            </h2>

            <p style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-muted)',
                marginBottom: '3rem',
                maxWidth: '600px',
                lineHeight: 1.8
            }}>
                這是一個自我探索的旅程。<br />
                我們將提供 40 個價值觀詞彙，透過三個階段的篩選，<br />
                協助您收斂出目前生命中最重要的 5 個核心價值。
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                style={{
                    background: 'linear-gradient(135deg, var(--color-accent), #ea580c)',
                    color: 'white',
                    padding: '1rem 3rem',
                    fontSize: '1.25rem',
                    borderRadius: '50px',
                    fontWeight: 600,
                    boxShadow: '0 20px 25px -5px rgba(234, 88, 12, 0.4)',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}
            >
                開始探索
            </motion.button>
        </motion.div>
    );
};

export default Intro;

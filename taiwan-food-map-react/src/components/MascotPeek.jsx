import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Coco the cat peeks from the bottom-right corner every ~30s, waves, then
 * slides back. Pure CSS/SVG cat (no extra image asset required).
 */
export default function MascotPeek() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const cycle = async () => {
      while (!cancelled) {
        await wait(8000 + Math.random() * 18000);
        if (cancelled) return;
        setVisible(true);
        await wait(4500);
        if (cancelled) return;
        setVisible(false);
      }
    };
    cycle();
    return () => {
      cancelled = true;
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Coco says hi"
          onClick={() => setVisible(false)}
          className="fixed z-30 cursor-pointer"
          style={{ right: 12, bottom: 'calc(120px + env(safe-area-inset-bottom))' }}
          initial={{ x: 80, opacity: 0, rotate: 18 }}
          animate={{ x: 0, opacity: 1, rotate: -2 }}
          exit={{ x: 80, opacity: 0, rotate: 18 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <CocoSticker />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function CocoSticker() {
  return (
    <div className="relative">
      {/* Speech bubble */}
      <motion.div
        className="absolute -top-7 -left-14 px-2.5 py-1 rounded-2xl text-[11px] font-semibold whitespace-nowrap"
        style={{
          background: '#FBF1DA',
          border: '1.5px solid #B98452',
          color: '#5A3A1A',
          boxShadow: '0 6px 12px -6px rgba(120,72,28,0.4)',
        }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        meow~ 嗨 👋
      </motion.div>

      {/* The cat sticker */}
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 8px 14px rgba(120,72,28,0.35))' }}
      >
        {/* Head */}
        <ellipse cx="36" cy="40" rx="26" ry="22" fill="#F0CDA0" stroke="#7A4B22" strokeWidth="2" />
        {/* Ears */}
        <path d="M14 28 L18 8 L30 22 Z" fill="#F0CDA0" stroke="#7A4B22" strokeWidth="2" strokeLinejoin="round" />
        <path d="M58 28 L54 8 L42 22 Z" fill="#F0CDA0" stroke="#7A4B22" strokeWidth="2" strokeLinejoin="round" />
        <path d="M19 23 L19 13 L26 21 Z" fill="#E89A7E" />
        <path d="M53 23 L53 13 L46 21 Z" fill="#E89A7E" />
        {/* Eyes (blink) */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.05, 1, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.85, 0.9, 0.95, 1] }}
          style={{ transformOrigin: '36px 38px' }}
        >
          <ellipse cx="27" cy="38" rx="2.2" ry="3" fill="#3A2410" />
          <ellipse cx="45" cy="38" rx="2.2" ry="3" fill="#3A2410" />
        </motion.g>
        {/* Nose + mouth */}
        <path d="M34 44 Q36 46 38 44" stroke="#7A4B22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <ellipse cx="36" cy="43" rx="1.6" ry="1" fill="#D85C3B" />
        <path d="M36 45 Q33 49 30 47 M36 45 Q39 49 42 47" stroke="#7A4B22" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Cheek dots */}
        <circle cx="22" cy="45" r="2.2" fill="#F4B58A" opacity="0.7" />
        <circle cx="50" cy="45" r="2.2" fill="#F4B58A" opacity="0.7" />
      </motion.svg>
    </div>
  );
}

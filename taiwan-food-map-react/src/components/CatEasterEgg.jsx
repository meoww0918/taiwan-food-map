import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const TARGET = 5;
const RESET_MS = 2500;

/**
 * Hidden tap-counter on a small cat sticker. Tap 5 times in quick succession
 * to trigger a "meow" celebration. Counter resets after 2.5s of inactivity.
 */
export default function CatEasterEgg({ position = 'left' }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const tap = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = count + 1;
    if (next >= TARGET) {
      setCount(0);
      setCelebrate(true);
      // Optional: short sound effect (no-op fallback if AudioContext blocked)
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.setValueAtTime(720, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.45);
        g.gain.setValueAtTime(0.0001, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.5);
      } catch (_) {}
      setTimeout(() => setCelebrate(false), 1800);
      return;
    }
    setCount(next);
    timerRef.current = setTimeout(() => setCount(0), RESET_MS);
  };

  return (
    <div
      className={`fixed z-30 ${position === 'left' ? 'left-3' : 'right-3'}`}
      style={{ bottom: 'calc(120px + env(safe-area-inset-bottom))' }}
    >
      <motion.button
        type="button"
        onClick={tap}
        aria-label="Tap me!"
        className="block rounded-full p-1.5 cursor-pointer"
        style={{
          background: 'rgba(252, 244, 234, 0.9)',
          border: '1.5px solid rgba(184, 132, 82, 0.6)',
          boxShadow: '0 6px 12px -6px rgba(120,72,28,0.45)',
        }}
        whileHover={reduce ? undefined : { scale: 1.08, rotate: -3 }}
        whileTap={reduce ? undefined : { scale: 0.88, rotate: 6 }}
        animate={
          reduce
            ? undefined
            : count > 0
            ? { scale: [1, 1.15, 1], rotate: [0, count % 2 ? -8 : 8, 0] }
            : {}
        }
        transition={{ type: 'spring', stiffness: 380, damping: 14 }}
      >
        <span className="text-2xl select-none block leading-none" aria-hidden="true">
          🐾
        </span>
      </motion.button>

      <AnimatePresence>
        {celebrate && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-2xl text-sm font-bold whitespace-nowrap pointer-events-none"
            style={{
              background: '#FBF1DA',
              border: '2px solid #B98452',
              color: '#D85C3B',
              boxShadow: '0 8px 16px -6px rgba(120,72,28,0.5)',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          >
            meow~ 🐱✦
          </motion.div>
        )}
      </AnimatePresence>

      {count > 0 && count < TARGET && (
        <motion.span
          className="absolute -top-1 -right-1 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center pointer-events-none"
          style={{ backgroundColor: '#D85C3B', color: '#FDF4EA' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {count}
        </motion.span>
      )}
    </div>
  );
}

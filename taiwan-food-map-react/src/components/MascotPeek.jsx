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
          className="fixed z-30 cursor-pointer right-3 lg:right-[calc(50%-500px)]"
          style={{ bottom: 'calc(120px + env(safe-area-inset-bottom))' }}
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

      <motion.img
        src={import.meta.env.BASE_URL + 'assets/coco.png'}
        alt=""
        width={45}
        height={45}
        draggable={false}
        className="w-[45px] h-[45px] md:w-[36px] md:h-[36px]"
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'block',
          filter: 'drop-shadow(0 8px 14px rgba(120,72,28,0.35))',
          userSelect: 'none',
        }}
      />
    </div>
  );
}

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const KEY = 'coco-onboarded-v1';

/**
 * One-time speech bubble from Coco the cat that points new visitors to the
 * Food Map. Auto-dismisses after 8s, or on click. localStorage-gated so it
 * only ever shows on first visit.
 */
export default function OnboardingBubble() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(KEY) === '1') return;
    const t = setTimeout(() => setShow(true), 1200);
    const auto = setTimeout(() => dismiss(), 9500);
    return () => {
      clearTimeout(t);
      clearTimeout(auto);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(KEY, '1');
    } catch (_) {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-auto px-3"
          style={{
            bottom: 'calc(140px + env(safe-area-inset-bottom))',
            maxWidth: 340,
            width: 'calc(100% - 24px)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        >
          <motion.button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss tip"
            className="relative px-5 py-3 text-left flex items-start gap-3 cursor-pointer w-full"
            style={{
              background: 'linear-gradient(180deg, #FBF1DA 0%, #F0DAA4 100%)',
              border: '2px solid #B98452',
              borderRadius: 18,
              boxShadow:
                '0 14px 26px -10px rgba(120,72,28,0.45), inset 0 1px 0 rgba(255,255,255,0.55)',
            }}
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            <span
              className="text-2xl select-none"
              aria-hidden="true"
              style={{ filter: 'drop-shadow(0 2px 0 rgba(120,72,28,0.18))' }}
            >
              🐱
            </span>
            <span className="flex-1">
              <span
                className="block text-[11px] uppercase tracking-[0.18em] font-semibold mb-0.5"
                style={{ color: '#A06432' }}
              >
                Hi, I'm Coco!
              </span>
              <span className="block text-[13.5px] font-semibold" style={{ color: '#5A3A1A' }}>
                Try the Food Map below — there are 8 hand-drawn maps you can download. ↓
              </span>
            </span>
            <span
              className="absolute -top-2 right-3 text-[10px] tracking-wider font-semibold rounded-full px-2 py-0.5"
              style={{ backgroundColor: '#7A4B22', color: '#FDF4EA' }}
            >
              ✕ tap to close
            </span>

            {/* Bubble tail pointing down toward the bottom nav */}
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-12 w-5 h-5 rotate-45"
              style={{
                background: '#F0DAA4',
                borderRight: '2px solid #B98452',
                borderBottom: '2px solid #B98452',
              }}
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

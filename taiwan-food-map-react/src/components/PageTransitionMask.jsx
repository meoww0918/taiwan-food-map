import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/**
 * Watercolor-blob page transition. On every route change a colored blob
 * expands from the last-clicked point, fills the screen briefly, then peels
 * back to reveal the new page. Listens globally for click coordinates so the
 * transition feels anchored to the user's interaction.
 */
export default function PageTransitionMask() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const clickRef = useRef({ x: 50, y: 80 });
  const [active, setActive] = useState(null);

  // Track last click position (% of viewport) to anchor the splash
  useEffect(() => {
    const handler = (e) => {
      clickRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
    };
    window.addEventListener('pointerdown', handler);
    return () => window.removeEventListener('pointerdown', handler);
  }, []);

  // Trigger a splash on every pathname change after the first render
  const firstRef = useRef(true);
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (reduce) return;
    setActive({
      key: location.pathname + Date.now(),
      x: clickRef.current.x,
      y: clickRef.current.y,
    });
    const t = setTimeout(() => setActive(null), 850);
    return () => clearTimeout(t);
  }, [location.pathname, reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active.key}
          className="fixed pointer-events-none"
          style={{
            left: `${active.x}%`,
            top: `${active.y}%`,
            width: 0,
            height: 0,
            zIndex: 100,
          }}
        >
          <motion.span
            className="absolute rounded-full"
            style={{
              left: 0,
              top: 0,
              width: 60,
              height: 60,
              marginLeft: -30,
              marginTop: -30,
              background:
                'radial-gradient(circle, rgba(216,92,59,0.85) 0%, rgba(196,136,79,0.7) 40%, rgba(196,136,79,0.4) 70%, rgba(196,136,79,0) 90%)',
              mixBlendMode: 'multiply',
            }}
            initial={{ scale: 0, opacity: 0.95 }}
            animate={{ scale: [0, 60, 80], opacity: [0.95, 0.6, 0] }}
            transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1], times: [0, 0.6, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
